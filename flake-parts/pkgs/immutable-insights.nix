# --- flake-parts/pkgs/immutable-insights.nix
{
  lib,
  flake-root,
  gitignoreSource,
  stdenv,
  bun,
  nodejs-slim_latest,
}:
let
  src = gitignoreSource flake-root;

  packageJson = lib.importJSON "${src}/package.json";
  inherit (packageJson) version;
  pname = packageJson.name;

  node_modules = stdenv.mkDerivation {
    pname = "${pname}_node-modules";
    inherit src version;

    nativeBuildInputs = [ bun ];
    buildInputs = [ nodejs-slim_latest ];

    dontConfigure = true;
    dontFixup = true; # patchShebangs produces illegal path references in FODs

    buildPhase = ''
      runHook preBuild

      export HOME=$TMPDIR

      bun install

      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall

      mkdir -p $out/node_modules
      mv node_modules $out/

      runHook postInstall
    '';

    outputHash = if stdenv.isLinux then "sha256-Jxkm2NK0MqVbTJX1bps9pvCspqUeD4kihgDZ4Ou8J/U=" else "";
    outputHashAlgo = "sha256";
    outputHashMode = "recursive";
  };
in
stdenv.mkDerivation {
  inherit pname version src;

  nativeBuildInputs = [
    node_modules
    nodejs-slim_latest
    bun
  ];

  configurePhase = ''
    runHook preConfigure

    cp -a ${node_modules}/node_modules ./node_modules
    chmod -R u+rw node_modules
    chmod -R u+x node_modules/.bin
    patchShebangs node_modules

    export HOME=$TMPDIR
    export PATH="$PWD/node_modules/.bin:$PATH"

    bun astro telemetry disable

    runHook postConfigure
  '';

  buildPhase = ''
    runHook preBuild

    bun run build

    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall

    mkdir -p $out/var/www
    mv ./dist/* $out/var/www

    runHook postInstall
  '';
}
