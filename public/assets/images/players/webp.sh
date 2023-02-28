# use squoosh-cli, convert all jpg to webp
# quality 60

for f in *.jpg; do
    squoosh-cli --webp '{quality:60}' $f
done
