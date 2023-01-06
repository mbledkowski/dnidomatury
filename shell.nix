{ pkgs ? import <nixpkgs> {
    overlays = [
      (
        self: super: {
          yarn = super.yarn.override {
            nodejs = pkgs.nodejs-16_x;
          };
        }
      )
    ];
  }
}:
pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    nodejs-16_x
    yarn
  ];
}
