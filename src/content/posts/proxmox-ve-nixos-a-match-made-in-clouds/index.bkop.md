---
title: Proxmox VE & NixOS, a match made in clouds?
published: 2025-07-19
image: "./cover.png"
tags: [DevOps, Programming, Nix, Proxmox]
category: DevOps
draft: true
description: |
    Managing servers and services deployed on said servers in 2025 can range
    from anything completely banal to needing multiple PhDs in orchestrations.
    Today we will look at one such option especially for handling NixOS servers
    and how does it compare to more traditional deployment styles >.<
---

# 1. Introduction

When it comes to virtualisation of linux images there aren't currently that
many Type 1 or Type 2
[hypervisors](https://en.wikipedia.org/wiki/Hypervisor), especially even
less when it comes to production grade virtualisation platforms (ie not just
backends but suites with mature ecosystems + community + support and GUIs).
If we ignore
[Hyper-V](https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/hyper-v-overview?pivots=windows-server)
and [whatever Oracle is doing](https://www.oracle.com/virtualization/) the only
real options we end up with are

1. [VMware ESXi](https://www.vmware.com/products/cloud-infrastructure/vsphere)
2. [Proxmox Virtual Environment](https://www.proxmox.com/en/products/proxmox-virtual-environment/overview)
3. [Xen based -- Citrix, XenSErver, XCP-ng](https://xenproject.org/)
4. And lastly one might also use some more vendor specific stuff like
   [Red Hat's virtualization platform](https://www.redhat.com/en/technologies/cloud-computing/openshift/virtualization)

In my limited czech experience I've perceived VMware and Proxmox to be roughly
equal in terms of popularity/use and community support up until very recently
where [Broadcom](https://www.broadcom.com/) acquisited the VMware foundation in
2023 and slowly started

- [replacing](https://stormagic.com/company/blog/vmware-licensing-changes/)
  perpetual licensing with subscriptions -- what a great idea (⸝⸝⸝O﹏ O⸝⸝⸝)
- forced migrations
- overall drastic price increases
- and most importantly, they decided to
  [discontinue](https://knowledge.broadcom.com/external/article/345098/end-of-general-availability-of-the-free.html)
  the free edition of VMware vSphere Hypervisor (ie ESXi) completely in
  early 2024

Broadcom naturally received significant public backlash, especially in regards
to the free edition of ESXi, which is why they went back on some of their
decisions, however, for most of us their nontransparency and complete disregard
for the community meant we decided to just move on and migrate to a
different solution => **Proxmox VE**.

# 2. Proxmox

**Proxmox Virtual Environment** (Proxmox VE or also PVE) is Type 1 Hypervisor
(running on bare metal) that uses KVM as its backend. What is special about
Proxmox is its approach to handling virtualisation -- the whole platform is written
as a custom Linux OS (based off Debian with a custom Linux kernel), all of the
GUIs, scripts, REST API, authentication, networking, etc... are all part of
the linux ecosystem of already existing and well understood tools. The Proxmox OS
itself acts as a sort of management partition/control admin for the KVM and the
resulting VMs run all alongside the base Proxmox debian based OS.

In short, with Proxmox we get all the performance of KVM, but we also
get a pretty comfy and mature environment based off tools and systems that we
are already familiar with and not some proprietary blob demanding sacrificial
subscription offerings to get basic functionality.

---

Now this is all great, but the truly novel thing which functions as the whole basis
for this post is something that I have yet to mention!
[Proxmox LXCs](https://pve.proxmox.com/wiki/Linux_Container)!

## 2.1. LXCs

**LXCs** or **Linux Containers** represent a lightweight alternative to fully
fledged VMs, they share the kernel of the base host (thanks to the fact that
we are running this on Linux to begin with) and directly access all of the
system resources without the need of a complete OS emulation.

:::note
In this aspect, they
are similar to [OCI containers](https://opencontainers.org/)
(ie. Podman, Docker, etc...), however, the key
difference is that they **are not** application containers, instead they are
OS containers (sometimes also called **system containers**) directly running
on the same level as the VMs, scheduled and
managed alongside the base system as we've already talked about.
:::

To create/modify/manage them Proxmox has built the
[Proxmox Container Toolkit](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#chapter_pct)
-- **pct** (also name of the CLI we will be using later) which is then tightly
coupled to the whole ecosystem. You also get image templating by default and
Proxmox ships a ton of popular and less popular LXC OS images by default. Since
they are more closely tied to the Proxmox host kernel, Proxmox also sets up
[cgroups](https://man7.org/linux/man-pages/man7/cgroups.7.html) and
[AppArmor](https://apparmor.net/) by default + network isolation as well.
All and all what I am trying to communicate is that LXCs are a great way to
deploy certain types of VMs without all of the necessary overhead
and performance penalty of running a separate kernel and OS emulation.

A curious reader might ask, what kind of types are we talking about?
Great question. 🤓

# 3. The nix ecosystem

I'm planning to write some proper introductory tutorials for the nix ecosystem,
however, right now this will be only a limited short intro into the world of
nix and NixOS.

The term [Nix](https://nixos.org/) is more of an umbrella term that can refer
to a few different things depending on the context

1. a pure, domain specific functional language -- [nixlang](https://nix.dev/manual/nix/2.26/language/)
2. also to its compiler and evaluator -- [cppnix](github.com/nixos/nix)
3. and lastly people also sometimes shorten **NixOS**, the pure declarative
   GNU/Linux distribution based on Nix (hehe), to "nix" as well.

:::note
Technically there are a few different compilers and evaluators for nixlang, but the one
that started it all by [Eelco Dolstra](https://edolstra.github.io/) back in 2003
is `github:NixOS/nix` which
is also referred to as **cppnix** to prevent confusion from other implementatons.

::github{repo="NixOS/nix"}
:::

## 3.1. Nix

Both **nixlang** and **cppnix** were designed and written by Eelco around 2003
in his influential thesis
[The Purely Functional Software Deployment Model](https://edolstra.github.io/pubs/phd-thesis.pdf)
as a response to the adoption of some impure package managers at that time
-- [Yum and RPM](https://www.redhat.com/en/blog/how-manage-packages), which
unfortunately became a standard and in 2025 the most used package managers
are all impure and directly modify
[the Linux FHS](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html)
-- dpkg, apt, rpm, pacman, apk, portage, pamac, slackpkg + same thing
happens with Flatpaks and snaps as well.

The base building block for the nix package manager is a **derivation**, which
is a special type of primitive in the **nixlang** that can be resolved to
a `/nix/store` path. Roughly speaking, derivations represent the Nix way of
generalizing the notion of a *"package"*.
One special property of the nix language and compiler is
that there is no [partial evaluation](https://en.wikipedia.org/wiki/Partial_evaluation),
the program either evaluates or doesn't and derivations either get resolved
or not, which implies a very special property

:::important[Theorem (Validity invariant)]
If a path is valid, it exists in the Nix store (commonly represented as an
FOD -- filesystem object).
:::

=> translating this back to our package management domain this means that
only valid packages get built and resolved to a `/nix/store` path. You can
think of this the same way as how Rust guarantees a memory safe program
if it compiles (this isn't technically true if you use `unsafe`, but let's
not worry too much otherwise we will accumulate too many wrinkles). Lastly,
this is an implication and not an equivalence, which should immediately
make sense to you since if you try hard enough you can technically manually
push invalid paths (i.e. not packages) into the store, however, given
a requested package identified by its path hash it is computationaly infeasible
to produce a fake malware package with the same path hash identifier, which
is the **key property**!

-----

Now let's move on, to illustrate the basics of nix package management without
spending a ton of
time giving a crash course in programming languages design, here is an example taken from
[github\:NixOS/nixpkgs/7a6ffab/pkgs/by-name/co/cowsay/package.nix](https://github.com/NixOS/nixpkgs/blob/c87b95e25065c028d31a94f06a62927d18763fdf/pkgs/by-name/co/cowsay/package.nix#L47)
a very basic Perl binary -- [cowsay](https://github.com/cowsay-org/cowsay)

```nix
# --- cowsay.nix
{
  fetchFromGitHub,
  makeWrapper,
  perl,
  stdenv,
}:
stdenv.mkDerivation (finalAttrs: {
  pname = "cowsay";
  version = "3.8.4";

  src = fetchFromGitHub {
    owner = "cowsay-org";
    repo = "cowsay";
    rev = "v${finalAttrs.version}";
    hash = "sha256-m3Rndw0rnTBLhs15KqokzIOWuYl6aoPqEu2MHWpXRCs=";
  };

  nativeBuildInputs = [ makeWrapper ];

  buildInputs = [ perl ];

  makeFlags = [ "prefix=${placeholder "out"}" ];

  postInstall = ''
    wrapProgram $out/bin/cowsay \
      --suffix COWPATH : $out/share/cowsay/cows
  '';
})
```

then we can build and easily run this with

```bash
nix-shell -p "((import <nixpkgs> {}).callPackage ./cowsay.nix {})" --run "cowsay henlo :3"
 ________________
< henlo :3 >
 ----------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

## 3.2. NixOS

**NixOS** is a special type of nix derivation, that wraps a bunch of GNU/Linux
packages into a bootable `.iso` image, but it itself is yet another derivation,
which is a clever design decision.

Now comes the question how does one handle configuring the actual linux system,
stuff like changing bootloader options, modifying kernel boot flags, setting up
users and group or more high level stuff such as installing a desktop environment.
Moreover, it would be great if services and programs could use each others
configurations. This could definitely be achieved via the existing toolset
around derivations, their overrides and overlays, but the UX would be
questionable at best, this is why NixOS introduced the concept of
**[NixOS modules](https://nixos.wiki/wiki/NixOS_modules)**.
The bootable system derivation itself is then hidden under the
`config.system.build.toplevel` attribute.

### 3.2.1. NixOS modules

:::important[Definition (NixOS module)]
A **NixOS module** is a nixlang function returning an attrset with 3 special
fixed key-values: `imports`,
`options` and `config` (if you omit these then a toplevel `config` is
assumed) that later gets evaluated and resolved
using [`lib.evalModules`](https://github.com/NixOS/nixpkgs/blob/d254223c8dfb138ca96e138619b1250e28af7b92/lib/modules.nix#L84).

1. `options` defines a namespace of typed nix values that are used when resolving
   the `config` key.
2. `config` is a lazily evaluated attrset of self-referential thunks using the
   "variables" defined within `options`
3. `imports` is an array of additional NixOS modules that should be added
   to the current evaluation scope.
:::

These modules technically represent an
[Open Recursion](https://www.cs.ox.ac.uk/people/ralf.hinze/talks/Open.pdf)
model and in a very roundabout funny way writing NixOS modules
resembles writing configuration and business logic classes in
[OOP](https://en.wikipedia.org/wiki/Object-oriented_programming).
I might follow up on this another day with a more in depth blogpost
since I do really feel like an OOP model might fit NixOS modules more
and would solve a bunch of issues that stem from the current design.
Anyway ...

----

Here is a showcase of a typical module that prepares some values and uses them
to define a systemd service. [nixpkgs](https://github.com/NixOS/nixpkgs/)
doesn't necesarilly enforce any standard (aside from formatting with
`nixfmt-rfc-style`), but the vast majority of NixOS modules end up having a
very similar structure which is illustrated on the example below.

```nix
# --- myService.nix
{ config, lib, pkgs, ... }:
let
  inherit (lib) mkIf mkEnableOption mkOption;

  cfg = config.myService;
in {
  options.myService = {
    enable = mkEnableOption "Enables my service";

    user = mkOption {
      type = lib.types.str;
      default = "myservice-user";
      description = "User under which should the service be run";
    };

    myMessage = mkOption {
      type = lib.types.str;
      default = "Hello from a NixOS module!";
      description = "Message to be printed";
    };
  };

  config = mkIf cfg.enable {
    users.groups.${cfg.user} = {};
    users.users.${cfg.user} = {
      isSystemUser = true;
      group = cfg.user;
    };

    systemd.services.my-service = {
      description = "A simple service to print a message";
      wantedBy = [ "multi-user.target" ];
      serviceConfig = {
        Type = "oneshot";
        User = cfg.user;
        ExecStart = "${pkgs.coreutils}/bin/echo '${cfg.myMessage}'";
      };
    };
}
```

End users would then include this and use this in their appropriate NixOS
hosts (which are just other NixOS modules) like so

```nix
{ ... }: {
  imports = [ ./myService.nix ];
  myService = {
    enable = true;
    myMessage = "hiiii (,,¬﹏¬,,)";
  };
}
```

### 3.2.2. `nixos-shell`

We can actually demonstrate a practical live example using a lightweight
[QEMU VM](https://www.qemu.org/),
which should work for any platform that has **nix** (just the package manager)
installed so you, the reader, can try it as well! (≧ヮ≦) For this we will
utilize `nixos-shell`

::github{repo="Mic92/nixos-shell"}

As a very simple illustration let's define a very simple NixOS system with
one nginx service that yields a `Henlo world :3` string

```nix
# --- vm_example.nix
{ ... }:
{
  system.stateVersion = "25.11";
  services.nginx = {
    enable = true;
    virtualHosts."localhost" = {
      default = true;
      locations."/" = {
        extraConfig = ''
          add_header Content-Type text/html;
          return 200 "<h1>Henlo world :3</h1>";
        '';
      };
    };
  };
}
```

Now we can easily spin up a VM in a single command thanks to the flakes CLI
API, we will also remap the internal HTTP port `80` to our hosts port `8080` in case
you have already something running on this port

```bash
QEMU_NET_OPTS="hostfwd=tcp::8080-:80" nix run \
    --extra-experimental-features "nix-command flakes" \
    github:Mic92/nixos-shell -- vm_example.nix
```

Navigating to `http://localhost:8080/` should yield you the message

```bash
❯ curl http://localhost:8080/
<h1>Henlo world :3</h1>⏎
```


# 4. DevOps and the irony of modern software deployment

As our software grew, so did the requirements for its throughput and the
servers it was hosted on. On the outside it seems like we went from
rather unscalable fixed simple systems to modular scalable complex ones and
that this is a natural evolution directly stemming from the requirements,
however, is this really the case? Let's analyze it more closely.

## 4.1. Server management evolution

Deployment solutions can get really complicated nowadays hence
we will try to set a basic categorization using our servers evolution
in time as a guidance.
The first deployment dimension (axis, component, disjunct type) that we will look at is
what I am going to call the **self-host dimension**.

The calculations will be done
from the viewpoint of owning and working with **1 physical machine** and
what can we do with that.

1. **Dedicated hardware**: The origin for all modern deployment were plain old OS images, basically
directly slapping a prepared `.iso` onto some host. This might seem like an
ancient obsolete idea, but that couldn't be further from the truth! Because
in this exact same way we still deploy **embedded** software. Creating
specialized small images using tools such as [buildroot](https://buildroot.org/)
with just a few services and then either burning them directly into ROM
or onto some storage device (SD card or external disk, etc...).
The base building block here is **one physical machine**.
=> `N services on 1 physical machine**`
2. **VMs**: A direct upgrade to the previous model is virtualization!
This decouples one physical machine into multiple hosts.
This is an older approach that still some companies use. In practice I'd say
most of them use multiple services per host, but a single purpose per host
(for example, it runs [nextcloud](https://nextcloud.com/), so it runs php-fpm,
an http server, potentially memcached/redis and maybe even a database =>
multiple services, single purpose).
The base building block here is **one virtual machine**.
=> `(N services in L VMs) on 1 physical machine`
3. **Containerization**: Building upon the previous model, we use VMs as a baseline,
but we can now also isolate concerns into their separate OCI compliant containers.
For example
only one VM for an eshop product, but a separate container for a database,
another one for nginx, then for client and backend and so on.
The base building block here is **one virtualized container**.
=> `((N services in M containers) in L VMs) on 1 physical machine`


And it naturally follows that the next dimension for us to analyze is the
**cloud computing axis**, we replace **physical machine** with a **cloud machine**,
i.e. a physical server that *runs somewhere else* and is managed by *someone else*.
Crucially, this implies that most of the time it is someone elses problem as well,
which is the entire reason behind cloud computing, yay!

The calculations here,
on the other hand, will be done from the viewpoint of a customer trying to buy
different products in the cloud, that means not necessarily looking at one
physical machine.

1. **Cloud hardware**: In my experience this is a more specialized niche use
case, but you can actually rent **one** physical machine, no virtualization
and hypervisor, in the industry we call this
[Bare-Metal-as-a-Service](https://en.wikipedia.org/wiki/Bare-metal_server)
(BMaaS). For example [Canonical](https://canonical.com/maas) seems to be
providing certain BMaaS services. Another interesting example that is more
targeted to gamers is Windows machines as a service, but these are also often
virtualized. The base building block here is **one cloud machine**. =>
`N services on 1 cloud machine`
2. **VPSs**: Now, the natural and logical evolution of self-hosting was to
provide users with a rented virtual machine, a **virtual private server**.
Actually renting bare metal is a bit more hassle to manage and also have
a bussinnes built around, VPSs are an optimal way to do cloud VMs, shared
machine with virtualized resources, easy to setup and spawn for new
users, automatic backups, virtual consoles, you can provide your customers
even some predefined OSs templates, for example with already populated
ssh keys and such.
The base building block here is **one cloud VPS**. =>
`N services in 1 VPS`
3. **Cloud containers**: The next level that we arrive when we start to
scale OCI, for example orchestration with [k8s](https://kubernetes.io/)
and [Terraform](https://developer.hashicorp.com/terraform) and others.
We stop caring about individual servers, we want to scale our services
onto potentially hundreds of individual servers and different locations.
The base building block here is **one cloud container**. =>
`(N services in M containers) in L cloud servers`
4. **Serverless (cloud services)**:  This is one of the more recent interesting
developments and is where we transcdended the notion of machines
altogether and we started seeking dedicated
cloud services as products. Typical examples are AWS services such as S3,
Lambda, RDS, DynamoDB, ECS or Cloudflare DNS. Basically we stop caring about
individual machines, servers and containers, we are paying for individual services.
And in some cases you can achieve a completely **serverless** (a very ironic
name indeed) deployment pipeline -- in the sense that you aren't managing
and interacting with server instances anymore.
The base building block here is **one cloud service** => `1 service in something somewhere`

---

Now my main gripe with this whole field is that DevOps engineers typically see
this as some sort of evolution timeline and think that picking the most complex
abstract cloud microservices or serverless solution is the correct approach,
since "it naturally follows that it's better than the *old ways* of thinking".
As you've already seen with the example of embedded software, I'd argue that
this is not always needed and choosing lower level solutions on this
complexity scale might lead to smaller costs and lower mental overheads in the
long run.
This, of course, depends on the problem domain, but that is exactly the point =>

:::important[Implication]
If you deploy cleanly, scaling and migrating up on the complexity scale
tends to be way more pleasant than the other way around.
:::

Lastly, these are two independent dimensions, axes, which means that the
platonic objectively best solution for your problem will lie somewhere
as a combination of both, meaning that you can use for example cloud
containers for your apps, a self-hosted local machine for some employee
related admin panels, AWS DBs or elastic search and so on...

## Deployment styles

- push & pull
- imperative & reproducible
- DSLs

## Comparisons

# 5. `PVE . NixOS $ service`
# 5. Combining PVE and NixOS

Now we reflect on what've learned so far and we will compose this knowledge
into a new deployment style.
