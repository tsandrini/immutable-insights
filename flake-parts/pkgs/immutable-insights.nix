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
  projectSrc = gitignoreSource flake-root;

  node_modules = stdenv.mkDerivation {
    pname = "immutable-insights_node-modules";
    version = "0.1.0";
    impureEnvVars = lib.fetchers.proxyImpureEnvVars ++ [
      "GIT_PROXY_COMMAND"
      "SOCKS_SERVER"
    ];
    src = projectSrc;
    nativeBuildInputs = [ bun ];
    buildInputs = [ nodejs-slim_latest ];
    dontConfigure = true;

    dontFixup = true; # skip shebangs patching

    buildPhase = ''
      bun install --no-progress --frozen-lockfile
    '';

    installPhase = ''
      mkdir -p $out/node_modules
      cp -R ./node_modules $out
    '';

    # Strategy is a fixed output derivation
    outputHash = if stdenv.isLinux then "sha256-Oyck0UYSI8l5VN/f7u8/VDAJFFEhnJFqPxQzTyzXRYk=" else "";
    outputHashAlgo = "sha256";
    outputHashMode = "recursive";
  };
in
stdenv.mkDerivation {
  pname = "immutable-insights";
  version = "0.1.0";
  src = projectSrc;

  nativeBuildInputs = [
    node_modules
    nodejs-slim_latest
    bun
  ];

  # dontFixup = true;

  buildPhase = ''
    runHook preBuild

    ln -s ${node_modules}/node_modules ./node_modules
    bun build-prod

    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall

    mkdir -p $out/var/www
    cp -R ./dist/* $out/var/www

    runHook postInstall
  '';
}
