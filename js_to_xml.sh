#!/bin/bash

js_file=mq.js ;
# echo -n "" > $js_file.xml
echo > $js_file.xml
echo "  <script type=\"text/javascript\" > /* <![CDATA[ */ " >> $js_file.xml
cat $js_file >> $js_file.xml
echo "  /* ]]> */ " >> $js_file.xml
echo "  </script>" >> $js_file.xml
