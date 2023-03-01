# resize all images in the current directory,
# min 100 * 100

for i in *.jpg; do
    convert $i -resize 400x225 -gravity center -crop 400x225+0+0 +repage $i
done
