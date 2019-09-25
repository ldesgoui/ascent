{ pkgs ? import <nixpkgs> {}
}:

with pkgs;

mkShell {
  buildInputs = [
    nodejs
    yarn
  ];

  shellHook = ''
    export NETLIFY_SITE_ID="7d8993ef-9803-468a-8062-48234c8ec1a6"
    alias vi.nuxt="vi \$(find pages components layouts store -type f) *.config.js static/admin/config.yml"
  '';
}
