coffee --compile --output lib/dict lib/src
coffee --compile --output templates/dict templates/src
lessc styles/src/main.less > styles/dict/main.css
