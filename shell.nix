{ pkgs ? import <nixpkgs> {}
}:

with pkgs;

mkShell {
  buildInputs = [
    nodejs
    yarn
  ];

  shellHook = ''
     alias vi.nuxt="vi \$(find pages components layouts store -type f) *.config.js static/admin/config.yml"
  '';
}
