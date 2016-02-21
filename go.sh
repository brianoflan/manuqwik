#!/bin/bash


echo -e "bash css_to_xml.sh\n" ;
bash css_to_xml.sh ;

echo -e "bash js_to_xml.sh\n" ;
bash js_to_xml.sh ;

prefix2=".mq"
# for prefix1 in test_disp manyFiles mkOneFile ; do
for prefix1 in manyFiles mkOneFile ; do
  echo "xsltproc for $prefix1"
  xsltproc -o $prefix1$prefix2.html $prefix1$prefix2.xml ;
  echo -e '\n' ;
done ;

#
