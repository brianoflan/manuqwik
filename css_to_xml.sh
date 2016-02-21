#!/bin/bash

css_file=mq.css ;
# echo -n "" > $css_file.xml
echo > $css_file.xml
echo "  <style type=\"text/css\" > /* <![CDATA[ */ " >> $css_file.xml
cat $css_file >> $css_file.xml
echo "  /* ]]> */ " >> $css_file.xml
echo "  </style>" >> $css_file.xml
