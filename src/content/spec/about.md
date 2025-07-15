# 1. About

Hi, I'm Tomáš Sandrini (=> **tsandrini**), a freelance Software Engineer & Data
Scientist located in Prague, and this is a personal space of mine on the
internet, for my  unorganized scattered thoughts and ideas.

You can find the complete source of this blog at:
::github{repo="tsandrini/immutable-insights"}

:::note
The codebase is licensed under the
[MIT License](https://opensource.org/license/mit), however,
the individual posts have their own appropriate licenses attached to them that
you can find at the bottom of the posts.
:::

# 2. Pubkeys

## 2.1. SSH

My primary ssh-ed25519 pubkey is

```txt
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDWrK27cm+rAVKuwDjlJgCuy8Rftg2YOALwtnu7z3Ox1 tsandrini
```

You can append it to your machine via

```bash
wget https://tsandrini.sh/tsandrini.keys -O- >> ~/.ssh/authorized_keys
```

## 2.2. GPG

All my commits, communication and some of my files are signed by a
GnuPG key with an ascii pubkey counterpart [tsandrini.gpg](/tsandrini.gpg),
if a different key is being used then it's probably not me.

```
1926 AF50 F0B9 96F2 BDD1  6827 3E83 AD69 0FA4 F657
```

You can append it to your machine via

```bash
wget https://tsandrini.sh/tsandrini.gpg -O- | gpg --import
```

# 3. Background

I have a super chaotic history of studying computer science, physics and
math at university. I somehow wanted to pursue all of those fields
simultaneously while struggling to commit to any single one.
After spending multiple years between them I ultimately
decided to not pursue a career in academia due to its overly bureaucratic
nature and my mental health. Overall I value and try to achieve more of a
**horizontal knowledge** (i.e. broad) both in computer & natural sciences and
I ultimately enjoy way more learning these on my own where I have
the freedom to focus on stuff that particularly interests me.

## 3.1. CV/Resume

I have a short/poster style version of my CV publicly available at (**TODO**),
for any potential business inquiries or jobs offers you can send me a message at
[business@tsandrini.sh](mailto:business@tsandrini.sh) or
[t@tsandrini.sh](mailto:t@tsandrini.sh) to request a longer version.

# 4. Values

By living on a [Kähler manifold](https://en.wikipedia.org/wiki/K%C3%A4hler_manifold),
each one of us perceives a local version of reality, sometimes unfortunately
with a disregard to its global topological structure. These are some fundamental
laws, i.e. values, that I specifically perceive and hold to be true around me
and hopefully one day, they can cover even a larger subspace, i.e. broader
society

- [Mettā](https://en.wikipedia.org/wiki/Maitr%C4%AB) -- i.e. loving kindness to oneself, to others and to your environment
- [Kalokagathia](https://en.wikipedia.org/wiki/Kalos_kagathos) -- harmony between psysical and mental wellbeing
- *Equality*, both in a [metaphysical](https://en.wikipedia.org/wiki/Metaphysics)
  and material way
- Open Source/Open Hardware and sometimes also [Free Software](https://www.gnu.org/philosophy/free-sw.html)

# 5. Interests

## 5.1. Sports

Aside from stuff related to my profession, sports represent one of the main
things that bring me joy & peace in my spare time. I am open to doing/trying
almost any sports except ball sports, which I am not particularly good at. 😭

As of right now, these are my main focus:

- **Rock climbing**: My focus usually switches between bouldering and
  sport climbing depending on the season. I'd guess my bouldering grade to be
  between V5-V7, but that is super relative to the gym grading, most seem to be
  sandbagged, but there are also some very soft gyms in Prague. I tend to prefer
  slabby technical flexy climbing rather than pure power 🤔

- **Running**: Running was my primary sport for a long time, but the huge volumes
  at such an early age completely destroyed my right knee so now I do only
  sporadic recreational running. Recently I've been trying more to get back into
  my older shape, which is basically impossible, but I'm trying nonetheless,
  if you want to check up on my endeavours, you can follow me on
  [Strava](https://www.strava.com/athletes/tsandrini_) or also
  [Garmin connect](https://connect.garmin.com/modern/profile/108ef28c-c508-45e8-8b59-43c301d48f9e).

  Here are some random ancient results that are still available on the internet
  if you are interested:

  - 2019-2020? Horský půlmaraton na Šumavě -- I can't find the results but a great run though
  - 5.08.2018: 5k PB attempt in 16:50 with overall 3:22 pace
  - [01.05.2018 Decathlon Run: duo team 2x5.7km in 53:27 min](https://www.stopnito.cz/vysledky-zavodu/225)
  - [21.04.2018 Krajský půlmaraton Plzeňského kraje: 21km in 2:05:33](https://www.behej.com/bezecke-tabulky/zavody/25386-krajsky-pulmaraton-plzenskeho-kraje)
    - insane heat waves during this day and I was sick practically the whole
      time :( hence the bad time unfortunately
  - [20.10.2013 Jesenický Surovec: 12km in 54:33 min](https://maratonkladno.cz/a/a3610.pdf)
  - [28.09.2013 Neumannova stezka: 9.6 km in 40:54 min](https://maratonkladno.cz/a/a3575.pdf)
  - [25.08.2013 Rakovnická patnáctka: 15km in 1:13:05 h](https://maratonkladno.cz/a/a3493.xls)
  - [15.08.2013 Rozdělovský 1/4 maraton: 10.5km in 49:01 min](https://maratonkladno.cz/a/a3482.pdf)

- **Lifting**: SBD 100/75/145, iykuk 💪 more on the **strength + cardio => hybrid**
  side, since I don't super care about body aesthetics and I also tend to
  cycle climbing/lifting/running arcs.

- **Hatha yoga & general stretching**: I have always liked being above flexible
  and yoga has been a good outlet for this as well as being a great contrastic
  force to the more demanding sports + Hatha yoga also hugely helps with
  meditations. Also apparently I've been told that I am partly hypermobile,
  not really sure but I do indeed enjoy stretching.

- **Hiking**: This is a mostly seasonal hobby, but I do enjoy bivouacking
  a few times a year, sleeping under the clear sky on the ground, cooking random
  low effort instant noodles and spending the whole day walking
  while clearing my mind from everyday worries.

## 5.2. Tech, Science

- Rust, Nix, OCaml, Haskell
- reproducible systems, server side management, deployment and general DevOps
- PL: FPs, effect systems
- math (nowadays just recreational): algebraic topology, algebraic geometry
  and differential geometry
- relativistic physics (really, really, just recreational)

## 5.3. Nix/NixOS

I've been using [GNU/Linux](https://www.gnu.org/gnu/linux-and-gnu.html)
practically since I got my first laptop and I've been
immensely interested in the whole ecosystem, the available tools and
the community. I really enjoyed interacting with the people there and
contributing back to the various tools I was using. I've always felt like
this is a great
example of a bidirectional social contract without having to rely on
proprietary market products to function, simply

> I give you, you give back.
>
> -- by Someone, Somewhere, Sometime?

### 5.3.1. Motivation

Despite that, one thing that has persistently bugged me since then was the
impurity of its
[Filesystem Hierarchy Standard (FHS)](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html).
I felt like it was definitely an upgrade to the conventional Windows
understanding of how to structure a
[Local File System](<https://learn.microsoft.com/en-us/previous-versions/windows/desktop/legacy/aa364407(v=vs.85)>)
but its simplicity brought a lot of practical problems, most notably a shared
global state for all binaries, nonreproducibility of systems and complicated
deployment of services and programs. Now, the deployment was back in the day
solved by preparing dedicated system `.iso`s and deploying them on single purpose
[VPS](https://en.wikipedia.org/wiki/Virtual_private_server). This was definitely
way too complicated and the industry has moved on from this approach and
adopted a [Dockerized](https://www.docker.com/) world, with arguably way more
complicated layers on top of that ([k8s](https://kubernetes.io/),
[Terraform](https://www.terraform.io/)). These technologies helped with
reproducibility of services and certain parts of configurations, however,
they are built on top of the old FHS, the
[Dockerfile](https://docs.docker.com/reference/dockerfile/) format is fundamentally
a set of imperative procedures manipulating FHS, which may seem like an
unimportant fact at first but has a dire implication

:::tip[Theorem]
Docker images aren't
[reproducible](https://en.wikipedia.org/wiki/Reproducible_builds), docker itself is at most repeatable.
:::

One way to fix this without having to replace the whole docker ecosystem is to
fix the impurity by either

1. $$\text{build}(X) = \text{Nix}(\text{Dockerfile}(X)) \sim \text{Nix}(X)$$

   Delegate the build of the image to Nix with resulting NixOS images, which
   in practical terms means that your Dockerfile has a single line building
   a NixOS system.
   This will result in "effectively" pure builds using docker tools.

1. Let Nix completely manage docker image builds via `pkgs.dockerTools`
   With this approach you ditch base docker but you are still free to build on
   this with k8s/terra classic style devops.

Moreover docker development is an insane overkill for local development which
is significantly enhanced by the way we structure our software, for example,
to develop some typical API/client app you'd run: backend, client, hotreload process
for the client, HTTP server,
database, probably a database explorer, some in-memory cache db
(memcached, redis), and optionally stuff like a task scheduler, crons, etc...

### 5.3.2. Nix ecosystem

And these are some of the reasons why the
[nix package manager](https://github.com/NixOS/nix),
exists. It fixes the fundamental issue of impure
package management by sandboxing the builds into a pure reproducible process,
yielding packages (derivations), that are uniquely identifiable by a hash
produced from all of the pure inputs, outputs and metadata that produced said
packages. Given the resulting package manager we can then build on top of this
by creating

- **nixpkgs** -- community package repository of purely reproducible packages,
  as well as a self-contained history that enables you to build 10years
  old software without issues
- **cache.nixos.org** -- a **safe** binary cache, since all derivations are uniquely identified
  by their store paths (which is a hash of all its inputs)
- **NixOS** -- an (*almost*) stateless GNU/Linux distribution, which is basically
  yet another derivation managed by the nix language
- **NixOps** -- (or other
  [deployment tools](https://github.com/nix-community/awesome-nix#deployment-tools)
  and [devops tools](https://github.com/nix-community/awesome-nix?tab=readme-ov-file#devops))
  a pure stateless (depends on the
  tool) reproducible alternative to status-quo ansible, docker-compose,
  docker-swarm, k8s, terraform and others.
- **nix containers** -- an alternative OCI implementation and/or a management
  tool for other OCIs via toolsets such as `pkgs.dockerTools`
- **devshells** -- lightweight developer environments either via `pkgs.mkShell`,
  [devenv](https://devenv.sh/) or [numtide/devshell](https://github.com/numtide/devshell)
- **home-manager** -- a pure configuration module system to manage linux FHS
  home (even on non-NixOS systems!)
- **nix-darwin** -- for the fancy people
- **flakes** -- a meta package-manager for nix project themselves
- 3rd party nix user repository, nixos-hardware, nixvim, nix-topology,
  direnv, pre-commit-hooks, CI, reproducible disks management via disko,
  opt-in filesystem via impermanence

and much, much more...

### 5.3.3. Present time

I hope this shows a tiny bit why nix is important to me and should also be
important to you as well and potentially also sparked some curiosity in
you. As a result, I am quite active in the nix community, I maintain a bunch
of packages and also a few nix related projects.

If you are interested I also manage almost every machine that I own through nix
in some way or another and have everything store in a public monorepo.

::github{repo="tsandrini/tensorfiles"}

## 5.4. Speedcubing

I recently returned to cubing after an unfortunate 10 years long pause. I was a
super active cuber back in 2013-2015 with respectable averages back then
(not so much anymore 😭), had a pause and now I have a bit more
free time that I can dedicate to my random fancy cubical and non-cubical puzzles.
Also planning to compete more and get higher on the czech national rankings.

My WCA profile here
[2015SAND03](https://www.worldcubeassociation.org/persons/2015SAND03), and if
you are interested you can also check out my algsheet on
[SpeedCubeDB](https://speedcubedb.com/algsheet/35046).

And if you are into this kind of thing, here are my current times at home:

- **3x3**: all time PB 8.21s, my current local PB is 8.77s
  (`R B' R U B L2 F R' D' L2 U2 F2 D' F2 D2 B2 U' B2 L2`), 11.10s ao5, 12.25s
  ao12

  Almost exclusively
  [CFOP](https://www.speedsolving.com/wiki/index.php/CFOP_method)
  with occasional [Roux](https://www.speedsolving.com/wiki/index.php?title=Roux_method)
  /[ZZ](https://www.speedsolving.com/wiki/index.php?title=ZZ_method). Dual CN.

- **3x3 OH**: (One-handed) 16.62s PB
  (`D' R2 D R2 B2 R2 D R2 U2 F2 L F' U B D2 U F' D' R' B'`), 22.18s ao5,
  23.96s ao12.

  CFOP with occasional Roux. Can do both with/without table abuse >.<

- **2x2**: 1.43s PB (`R' U2 F' U' F2 R' F' R2 U'`), 4.01s ao5, 4.43s ao12

  Still using
  [Ortega](https://www.speedsolving.com/wiki/index.php?title=Ortega_Method)
  with a few simple CLLs :( haven't really committed to 2x2
  algsets yet. Fully CN.

- **4x4**: 46.72s PB (`B U' D F2 U2 L' F R' B' R2 B2 L2 D2 B R2 F' U2 F U Rw2 Fw2 U Fw2 R' D B2 R U Fw2 U Fw' D' Rw2 F' D' Fw' Rw2 Uw' Fw Rw2 D2 F2 D'`),
  54.06s ao5, 55.52s ao12

  I never really enjoyed big cubes, mostly because the hardware in 2014 was
  insanely bad and would frequently simply explode mid-solve
  (popping isn't a strong enough word to describe this) so aside from casual solving I had
  pretty bad times, but I recently bought some new hardware and tried
  [Hoya](https://www.speedsolving.com/wiki/index.php?title=Hoya_method), which
  completely changed my enjoyment of big cubes and I'll hopefully return soon with
  better times.

- **pyraminx**: 2.75s PB (`B R' U' B U' B' U R u`), 6.01s ao5, 6.93s ao12

  I know [Intuitive L4E](https://cubing.mikeg.me.uk/cubing-algs/html/l4e.html)
  but I still use mostly a mix of LBL and some algs for specific cases since
  I don't do that much pyra but I might dedicate a bit more time into this event
  in the future. Fully CN.

- **5x5**: 1:51.16s PB, 2:03.47s ao5, 2:05.44s ao12

  I don't do much of 5x5 >.<. I'll maybe invest a little bit more time into it
  in the future but I'm currently pretty baaad. Solving using Hoya, I use Hoya
  practically for all big cubes.

And here is a random pic of cubes:

![Cubes 🧊](/images/cubes_new.jpg)

## 5.5 Other

### 5.5.1. Languages & Linguistics


TBD - LLSPI, Athenaze, Vietnamese, etc...

### 5.5.2. Buddhism and Meditations

I was heavily invested in the teachings of dharma and Buddhist practice,
not so much anymore but I'd still argue it strongly influenced my viewpoints on
life, nature of day to day suffering and especially *Love*. I still practice
meditations but it's more casual and definitely not as serious as it was
before for me, basically I'm more invested in *non-monastic Layman* life
currently, which could be argued is in a certain sense more in line with
Buddhist teachings.

Anyway, some great resources regarding dharma:

1. Gethin, Rupert. The Foundations of Buddhism. 1. publ. paperback, 17th pr. An OPUS Book. Oxford: Oxford Univ. Press, 2010.
2. Walpola Rāhula. What the Buddha Taught. 2nd and enl. ed ed. Evergreen, E-641. New York: Grove Press, 1974.
3. Batchelor, Stephen. Buddhism without Beliefs: A Contemporary Guide to Awakening. New York: Riverhead Books, 1997.

And regarding meditations? Only one correct answer! (a small hyperbole okay,
definitely use whatever suits your individual needs, for example, if you
require more meditative joy)
[TMI](https://www.goodreads.com/book/show/25942786-the-mind-illuminated)!!!
For me personally and for my unfortunately analytic dumb brain, this is the
only resource that yielded any measurable results whatsoever.

![The Mind Illuminated - Conscious Mind](/images/TMI_diagram.png)

### 5.5.3. Houseplants?

I love plants!!! Plants everywhere, there is no such thing as "*enough plants*"
😌

![Mandarinka 🟠](/images/mandarinka.jpg)
