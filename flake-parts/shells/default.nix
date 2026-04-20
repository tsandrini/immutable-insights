# --- flake-parts/shells/default.nix
{ lib, ... }:
{
  perSystem =
    { pkgs, config, ... }:
    {
      devShells = {
        default = config.devShells.dev;

        dev = pkgs.callPackage ./dev.nix {
          inherit lib;
          pre-commit = if (lib.hasAttr "pre-commit" config) then config.pre-commit else null;
        };
      };
    };
}
