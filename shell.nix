{ pkgs ? import <nixpkgs> {}
}:

with pkgs;

mkShell {
  buildInputs = [
    nodejs
    yarn
  ];

  NETLIFY_SITE_ID = "7d8993ef-9803-468a-8062-48234c8ec1a6";

  shellHook = ''
    rm node_modules/cwebp-bin/vendor/{cwebp,dwebp}
    ln -s "${libwebp}/bin/cwebp" "node_modules/cwebp-bin/vendor/cwebp"
    ln -s "${libwebp}/bin/dwebp" "node_modules/cwebp-bin/vendor/dwebp"

    rm "node_modules/mozjpeg/vendor/cjpeg"
    ln -s "${mozjpeg}/bin/cjpeg" "node_modules/mozjpeg/vendor/cjpeg"

    rm "node_modules/pngquant-bin/vendor/pngquant"
    ln -s "${pngquant}/bin/pngquant" "node_modules/pngquant-bin/vendor/pngquant"
  '';
}
