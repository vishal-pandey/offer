cp docs/CNAME ./
ng build --base-href /
cp docs/index.html docs/404.html
cp ./CNAME docs/
rm ./CNAME
git add .
git commit -m "Script update"
git push