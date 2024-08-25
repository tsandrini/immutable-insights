# --- flake-parts/pkgs/default.nix
{ config, inputs, ... }:
let
  inherit (config) flake-root;
in
{
  perSystem =
    { pkgs, config, ... }:
    {
      packages = {
        default = config.packages.immutable-insights;

        immutable-insights = pkgs.callPackage ./immutable-insights.nix {
          inherit flake-root;
          inherit (inputs.gitignore-nix.lib) gitignoreSource;
        };
      };
    };
}
