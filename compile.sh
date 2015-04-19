coffee --compile --output lib/dict lib/src
coffee --compile --output lib/templates lib/templates
lessc styles/src/main.less > styles/dict/main.css
