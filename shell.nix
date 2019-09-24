{ pkgs ? import <nixpkgs> {}
}:

with pkgs;

mkShell {
  buildInputs = [
    nodejs
    yarn
  ];

  shellHook = ''
    export NETLIFY_SITE_ID="bfc4272c-f599-43b2-8b33-35c220201104"
    alias vi.nuxt="vi \$(find pages components layouts store -type f) *.config.js static/admin/config.yml"
  '';
}
