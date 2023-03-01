# resize all images in the current directory,
# min 100 * 100

for i in *.jpg; do
    if [ `identify -format "%w" $i` -gt `identify -format "%h" $i` ]; then
        convert $i -resize x100 -gravity center -crop 100x100+0+0 +repage $i
    else
        convert $i -resize 100x -gravity center -crop 100x100+0+0 +repage $i
    fi
done
