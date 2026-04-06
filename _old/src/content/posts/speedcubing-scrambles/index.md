---
title: Speedcubing scrambles
published: 2025-03-25
description: Lorem ipsum dolor sit atmet.
image: "./cover.png"
tags: [Speedcubing, Misc]
category: Speedcubing
draft: true
---

## Intro

Kdyžtak pardon za unorganized ramble + rovněž disclaimer, že nejsem nějakej
ultra expert a tudíž přebírej informace s nějakou úrovní tolerance, ale zde
odpověď na tvoji zprávu.

**Main point**: víceméně skoro všichni, co trénují speedcubing prakticky na
jakýkoliv úrovni jedou WCA (world cubing association, \[1\]) formát skládání, kterej
má celej dokument pravidel o tom jak to má probíhat, hlavní pointy k tomu:

- použiješ randomized WCA scramble (rozeberu ještě dál ve zprávě)
- máš 15sec na inspekci než začneš skládat, tady si můžeš rozmyslet jak udělat
  nějaký kroky dopředu, na jaký barvě skládat, potažmo nějaký bližsí specifika
  k daný metodě skládání
- začíná se tak, že máš obě ruce na timeru, potažmo klávesnici a konci se čas
  když zase zpátky položíš ruce na timer nebo klávesnici
- DNF když neslozeno, pokud ti chybí jen jeden turn, tak +2sec k času, je tam
  pak hromada dalších případů, který ti pricitaji +2 k času (touching the cube,
  inspekce přes 15sec, karate timer stop atp.)

Tudíž prakticky skoro všichni trénují ve formátu WCA, i kdyby pak šli na jiný
soutěže, například v Číně je teď celkem populární používat smart cubes, tak ty
pravidla jsou typicky WCA derived. Tohle zarucuje, že mají všichni stejnej generátor
stejně dlouhýho scramblu, že mají stejnej čas na inspekci atp.

A teď více k tomu zamíchávání (**scramble**).

## WCA Scramble

### God's number

Teorie toho jak se dělá ten scramble se opírá o God's number a God's algorithm \[2\]

Což je ve zkratce dokázaná věta (skrze upper a lower bound a větu o policajtech)
o tom, že pro libovolnou konfiguraci ty permutační grupy jde 3x3 rubikovka dostat
zpátky do složený solved konfigurace nanejvýš 20ti krokama a to `N=20` je pak v
komunitě nazývaný God's number. To číslo je samo o sobě dost zajímavý a to postupný
stahování tý horní závory má celkem komplikovanou historii, zpočátku to dost
limitovalo výpočetní síla tehdejších počítačů. Každopádně postupně dokonvergovali
do určitý procedury, ie. **algoritmu**, o kterým pak dokázali, že má pro všechny
konfigurace nanejvýš 20 kroků.

### WCA Scrambler

No a afaik ten oficiální wca scrambler je akorát inverze tohohle objeveného
algoritmu s nějakou dávkou pseudonáhodného seedování, to pak zaručuje, že jsou
ty scrambly dostatečně náhodný a jejich řešení nejsou ultra lehký. Z toho
rovněž i vyplývá, proč je oficiální scramble 20 kroků dlouhej.

Oproti tomu když dávám například běžným lidem zamíchat kostku, tak ty lidi mají typicky nějakej bias
pro to vytvářet cykly a často invertnou nějaký vlastní movy (ta kostka tvoří
permutační grupu, na který můžu vytvořit libovolný komutátory `[A, B] = A B A' B'`,
který zachovávájí tu kostku, viz. \[3\]),  čímž třeba nechají

- naorientovaný hrany
- částečně hotový kříže nebo layery pro nějaký barvy
- rohy na správných místech
- atp.

A pokud je danej řešič dostatečně zkušenej a všimne si toho v inspekci, tak
ten čas jde pak výrazně stáhnout oproti klasickým WCA scramblům.
Tedy => scrambly od náhodných lidí jsou typicky výrazně jednodušší než oficiální.

Kdyby tě to blíže zajímalo, tak je i dostupnej zdroj softwaru, kterej tyhle
scrambly generuje na oficiálních WCA soutěžích, tak to můžeš blíže prozkoumat,
viz. \[4\]

## Can't we just invert the scramble?

Dobrá otázka. Odpověď je: *ne, ale technicky ano v některých případech*.
Jenom pro názornost, takhle typicky vypadá nějaký WCA scramble, více ke cubing
notaci můžeš najít zde \[5\]

```txt
L R B2 L B2 U2 F2 U2 R B2 U2 D' R F L' F' L U R2 B
```

**Pakliže budeme řešit klasický 3x3 speedcubing** (potažmo 3x3 one handed,
3x3 blindfolded, atp.), tak

- na těch soutěžích to funguje tak, že ty před svým pokusem odevzdáš kostku, která
  je přenesena oficiálním scramblerům, který pak aplikujou vygenerovanej scramble
  prakticky chvíli před tvým solvem
- povinnost vygenerovat a připravit scrambly na soutěž má delegát, kterej ručí
  zodpovědnost za autenticitu těch scramblů a soutěže, typicky to dělá 1-2dny před
  soutěží a je jedinej člověk, kterej k ním má přístup do té doby než se předají
  scramblerům
- všichni soutěžící mají stejný scramble (v některých případech se dává extra scramble,
  když se něco, takzvaně lidově posere, ten je ale taky předurčený předem delegátem)

Z tohohle prakticky plyne, že

- soutěžící nemají během soutěže dostupný scramble, nemají tedy možnost si ho
  zapamatovat
- i kdyby jim byl řečenej během té 15sec inspekce, tak si ho většina lidí nezapamatuje
- A tohle je můj **nejdůležitější point**: Tohle `L R B2 L B2 U2 F2 U2 R B2 U2 D' R F L' F' L U R2 B`
  je naprosto nechutná sekvence, zkoušel jsem to teď na čas invertovat a průměruju
  okolo 13-15s, jelikož ty sekvence vyžadují spoustu regripů a není schopná převzít
  moje natrénovaná muscle memory, neboli, scrambly mají velice poor **TPS**
  (turns per second), u mě to vychází kolem 2TPS, řekněme, že kdybych to grindil,
  tak dostanu 5TPS, nicméně pro speedcubeři mají 13-15TPS na celý solve. Proč?
  Protože je to higly optimized field. Většina top cuberů používá optimalizovaný
  varianty CFOP metody (viz \[6\]), která není postavená na to, aby měla minimum
  kroků, nýbrž aby měla maximum ergonomičnosti, většina solvů používá R, U, D
  pohyby a minimum regripů (spoustá solvů ani neopouští home row a home grip),
  což je onen důvod, proč mají pro cubeři 13-15TPS.
  Tedy proto si myslím, že i kdyby měli k dispozici inverzi scramblu, tak bude
  furt výrazně pomalejší než jejich highly optimized metoda.

______________________________________________________________________

Jako additional fun fact, kdybychom namísto toho **uvážili 3x3 FMC (fewest moves
challenge)** (viz. \[7\], \[8\]), tak je to o něco zajímavější, jelikož jde o soutěž,
během níž dostanou soutěžící oficiální scramble a hodinu času na to, aby vymysleli
nejkratší možnou sekvenci, která vyřeší kostku, neboli... Máme scramble k
dispozici! Ale zde je z obvious důvodů zabanované vytvářet jakkékoliv variace
na řešení ve stylu inverze scramblu a spolu s řešením musí soutěžící i odevzdat
papír s poznámkama, na kterým by mělo být jasné jakej je myšlenkovej pochod člověka
a jak dokonvergoval k jeho řešení. Je pak tedy dost blatantly zřejmý, když se někdo
pokusil o inverzi scramblu a ty lidi mají pak ban na nějakou dobu.

To je vše!

## Reference

1. [https://www.worldcubeassociation.org/](https://www.worldcubeassociation.org/)
1. [https://en.wikipedia.org/wiki/God%27s_algorithm](https://en.wikipedia.org/wiki/God%27s_algorithm)
1. [https://www.speedsolving.com/wiki/index.php/Commutator](https://www.speedsolving.com/wiki/index.php/Commutator)
1. [https://github.com/thewca/tnoodle](https://github.com/thewca/tnoodle)
1. [https://jperm.net/3x3/moves](https://jperm.net/3x3/moves)
1. [https://jperm.net/3x3/cfop](https://jperm.net/3x3/cfop)
1. [https://speedsolving.fandom.com/wiki/Fewest_Moves](https://speedsolving.fandom.com/wiki/Fewest_Moves)
1. [Fewest Moves tutorial](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://fmcsolves.cubing.net/fmc_tutorial_ENG.pdf&ved=2ahUKEwj3rcrWhPCKAxULwAIHHUqUAbgQFnoECA8QAQ&usg=AOvVaw3xrV1MYCgyt68eJjpUaITC)
