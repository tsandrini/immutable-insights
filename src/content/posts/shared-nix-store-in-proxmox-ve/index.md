---
title: "Shared `/nix/store` in Proxmox VE"
published: 2025-03-25
description: Lorem ipsum dolor sit atmet.
image: "./cover.png"
tags: [DevOps, Programming, Nix, Proxmox]
category: DevOps
draft: true
---

podařilo se mi jinak setupnout ten shared `/nix/store` napric kontejnerama, ale musim rict, ze je to velice not worth nakonec :monkaS: :aPES_SadRain: anyway, já tam mám dva storage,

a) **local** - Directory, linux FHS, cca 100GB, tady zije samotnej proxmox system
b) **local-lvm** - LVM, samotnej base tensor pro drives na všechny VMs a CTs, tohle ma tak 5tera :monkaS:

no a ono je docela otravny, ze z tohohle aspektu je docela debilni napad ten shared store narvat na local FHS, takze musis jakoby vytvorit LVM volume, kterej mountnujes na base proxika a pak bindnes na ty kontejnery, steps:

1. podivej se jak mas presne pojmenovany ty storage pomoci `vgs` a `lgs`
1. `lvcreate -n shared_nix_store -V 50G --thinpool pve/data`
1. naformatuj `mkfs.ext4 /dev/pve/shared_nix_store`
1. Namountuj

```bash
mkdir -p /mnt/shared_nix_store
echo "/dev/pve/shared_nix_store /mnt/shared_nix_store ext4 defaults 0 0" >> /etc/fstab
mount /mnt/shared_nix_store
systemctl daemon-reload 
mkdir -p /mnt/shared_nix_store/store
chmod 755 /mnt/shared_nix_store/store
```

a potom muzes vytvorit ty bind mounty na kontejnery pomoci (`+ro` flag pokud to chces jen read-only)

```bash
pct set CT_ID -mp0 /mnt/shared_nix_store/store,mp=/nix/store
```

Kazdopadne tady budes potom řešit bootstrapping chicken and egg issue když to budeš poprvý pouštět, jelikož budeš mít prázdnej store a budeš neschopnej zapnout jakejkoliv nixos image :monkaS: tak pak musíš ještě řešit bootstrapping toho shared storu

```bash
pct set CT_ID -delete mp0 # opet zase smazeme
pct stop CT_ID
pct mount CT_ID
cp -a /var/lib/lxc/CT_ID/rootfs/nix/store/* /mnt/shared_nix_store/store/
pct umount CT_ID
pct set CT_ID -mp0 /mnt/shared_nix_store/store,mp=/nix/store # znova vytvorime bind
pct start CT_ID
```

No a ve vysledku na to nejak kaslu, minimalizoval jsem ten base template na 1GB a whatever, budu prostě kopírovat giga, jelikož ono je problém, že když ty obrazy buildis, tak se inherentne vsude stejnak ten /nix/store kopiruje a musis to manualne mazat, je to zkratka dost neergonomicky a lepsi je asi proste minimalizovat ten image :monkaS:

Kazdopadne co si myslim, ze by mohlo fungovat lip je experimentalni local overlay store featura (https://nix.dev/manual/nix/2.22/store/types/experimental-local-overlay-store), to by mozna stalo za to, ale uz na to asi kaslu

- je dalsi problem garbage collection a spravny vybirani roots :monkaS: musis si vytvorit dedikovanej kontejnej na garbage collection a v ostatnich CTs to vypnout a i tak si myslim, ze tam bude potencial na smazani aktivnich roots :bloatscreaming:
