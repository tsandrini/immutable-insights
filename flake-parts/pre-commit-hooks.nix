# --- flake-parts/pre-commit-hooks.nix
{ inputs, ... }:
{
  imports = [ inputs.pre-commit-hooks.flakeModule ];

  perSystem = _: {
    pre-commit.settings = {
      excludes = [
        "flake.lock"
        "_old/.*"
        ".*\\.jpg$"
      ];

      hooks = {
        # --- Nix ---
        deadnix.enable = true; # Find and remove unused code in .nix source files
        nil.enable = true; # Nix Language server, an incremental analysis assistant for writing in Nix.
        nixfmt.enable = true; # An opinionated formatter for Nix
        statix.enable = true; # Lints and suggestions for the nix programming language

        # --- Web ---
        biome.enable = true; # Formatter and linter for JS/TS/JSON/CSS

        # --- Shell ---
        shellcheck.enable = true; # Shell script analysis tool
        shfmt.enable = true; # Shell parser and formatter

        # --- Misc ---
        editorconfig-checker.enable = true; # .editorconfig file checker
        typos.enable = true; # Source code spell checker
        check-json.enable = true;
        check-toml.enable = true;

        # --- fs utils ---
        check-symlinks.enable = true; # Check for broken symlinks
        check-added-large-files.enable = true;
        check-executables-have-shebangs.enable = true;
        check-shebang-scripts-are-executable.enable = true;
        end-of-file-fixer.enable = true;
        mixed-line-endings.enable = true;
        trim-trailing-whitespace.enable = true;

        # --- VCS ---
        commitizen.enable = true; # Commitizen is release management tool designed for teams.
        ripsecrets.enable = true; # A tool to prevent committing secret keys into your source code
      };
    };
  };
}
