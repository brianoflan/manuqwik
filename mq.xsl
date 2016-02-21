<?xml version="1.0" encoding="UTF-8"?>
<!-- manu_qwik_v0.1.6 -->
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <!--
  <xsl:output method="xml" indent="yes" omit-xml-declaration="no" />
  <xsl:output method="html" indent="yes" omit-xml-declaration="no" />
  -->
  <xsl:preserve-space elements="manuscript div footnotes footnote aside html head body" />

  <xsl:variable name="js_file" select="'mq.js'" /> 
  <xsl:variable name="css_file" select="'mq.css'" /> 
  <xsl:variable name="make_one_file" select="'zzz'" />
  
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="footnote_ref">
    <sup>
    <xsl:text>[</xsl:text>
    <xsl:element name="a">
      <xsl:attribute name="href">
        <xsl:text>#footnote_</xsl:text>
        <xsl:value-of select="." />
        <xsl:value-of select="@num" />
      </xsl:attribute>
      <xsl:value-of select="." />
      <xsl:value-of select="@num" />
    </xsl:element>
    <xsl:text>]</xsl:text>
    </sup>
  </xsl:template>
    
  <xsl:template name="__footnote">
    <xsl:element name="div" >
      <xsl:attribute name="class">
        <xsl:text>footnote</xsl:text>
      </xsl:attribute>
      <xsl:attribute name="id">
        <xsl:text>footnote_</xsl:text>
        <xsl:value-of select="@num" />
      </xsl:attribute>
      <xsl:text>[</xsl:text>
      <xsl:value-of select="@num" />
      <xsl:text>]:  </xsl:text>
      <xsl:copy>
        <xsl:apply-templates select="node()|@*"/>
      </xsl:copy>
      <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
    </xsl:element>
    <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
  </xsl:template>
  
  <xsl:template match="footnote">
    <hr />
    <xsl:call-template name="__footnote" />
      
    <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
    <hr />
  </xsl:template>
  
  <xsl:template match="footnotes">
    <hr />
    <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
    <div class="footnotes" >
      <xsl:value-of select="text()" />
      <xsl:for-each select="footnote" >
        <xsl:call-template name="__footnote" />
      </xsl:for-each>
      <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
    </div>
      
    <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
    <hr />
  </xsl:template>
  
  <!-- Untested (using copy, apply-templates):
  <xsl:template match="_aside">
    <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
    <ul>
      <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
      <div class="aside">
        <xsl:copy>
          <xsl:apply-templates select="node()|@*"/>
        </xsl:copy>
        <br />
        <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
      </div>
      <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
    </ul>
  </xsl:template>
  -->
  
  <xsl:template match="aside | _aside">
    <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
    <ul>
      <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
      <div class="aside">
        <xsl:if test="local-name()='aside'">
          <xsl:text>Aside:</xsl:text><br />
        </xsl:if>
        
        <!--xsl:copy>
          <xsl:apply-templates select="node()|@*"/>
        </xsl:copy-->
        <xsl:apply-templates/>
          
        <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
        <br />
        <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
      </div>
      <xsl:text>&#10;&#32;&#32;&#32;&#32;&#32;&#32;&#32;&#32;</xsl:text>
    </ul>
  </xsl:template>
  
  <xsl:template match="div">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="/*/manuscript" >
    <html><xsl:text>&#10;</xsl:text>
      <head>
        <xsl:text>&#10;&#32;&#32;</xsl:text>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <xsl:text>&#10;&#32;&#32;</xsl:text>
        <title><xsl:value-of select="@title" /></title>
        <xsl:text>&#10;&#32;&#32;</xsl:text>
        
        <xsl:choose>
          <xsl:when test="$make_one_file='true'">
            <xsl:comment>link rel="stylesheet" type="text/css" href="<xsl:value-of select="$css_file" />"</xsl:comment>
            
            <!-- Doesn't work in Firefox: 
            <xsl:text>&#10;&#32;&#32;</xsl:text><xsl:text disable-output-escaping="yes">&#60;style type="text/css"></xsl:text>
            <xsl:value-of select="document(concat($css_file,'.xml'))" disable-output-escaping="yes" />
            <xsl:text>&#10;&#32;&#32;</xsl:text><xsl:text disable-output-escaping="yes">&#60;/style></xsl:text>
            -->
            
            <xsl:element name="style">
              <xsl:attribute name="type">
                <xsl:text>text/css</xsl:text>
              </xsl:attribute>
              <xsl:value-of select="document(concat($css_file,'.xml'))" disable-output-escaping="yes" />
            </xsl:element>
            
          </xsl:when>
          <xsl:when test="$make_one_file='false'">
            <xsl:element name="link">
              <xsl:attribute name="rel">
                <xsl:text>stylesheet</xsl:text>
              </xsl:attribute>
              <xsl:attribute name="type">
                <xsl:text>text/css</xsl:text>
              </xsl:attribute>
              <xsl:attribute name="href">
                <xsl:value-of select="$css_file" />
              </xsl:attribute>
            </xsl:element>
          </xsl:when>
        </xsl:choose>

        <xsl:text>&#10;&#32;&#32;</xsl:text>
  
        <xsl:choose>
          <xsl:when test="$make_one_file='true'">
            <xsl:comment>script type="text/javascript" src="<xsl:value-of select="$js_file" />"</xsl:comment>
            
            <!-- Doesn't work in Firefox: 
            <xsl:text>&#10;&#32;&#32;</xsl:text><xsl:text disable-output-escaping="yes">&#60;script type="text/javascript"></xsl:text>
            <xsl:value-of select="document(concat($js_file,'.xml'))" disable-output-escaping="yes" />
            <xsl:text>&#10;&#32;&#32;</xsl:text><xsl:text disable-output-escaping="yes">&#60;/script></xsl:text>
            -->
            
            <xsl:element name="script">
              <xsl:attribute name="type">
                <xsl:text>text/javascript</xsl:text>
              </xsl:attribute>
              <xsl:value-of select="document(concat($js_file,'.xml'))" disable-output-escaping="yes" />
            </xsl:element>
            
          </xsl:when>
          <xsl:when test="$make_one_file='false'">
            <!--
            <xsl:text>&#10;&#32;&#32;</xsl:text>
            <xsl:text disable-output-escaping="yes">&#60;script type="text/javascript" src="</xsl:text>
            <xsl:value-of select="$js_file" />
            <xsl:text disable-output-escaping="yes">">&#60;</script></xsl:text>
            -->
            <xsl:element name="script">
              <xsl:attribute name="type">
                <xsl:text>text/javascript</xsl:text>
              </xsl:attribute>
              <xsl:attribute name="src">
                <xsl:value-of select="$js_file" />
              </xsl:attribute>
              <xsl:text> </xsl:text>
            </xsl:element>
          </xsl:when>
        </xsl:choose>


        <xsl:text>&#10;&#32;&#32;</xsl:text>
        <xsl:call-template name="js_config" />
        <xsl:text>&#10;&#32;&#32;</xsl:text>
        
      </head>
      <xsl:text>&#10;&#32;&#32;</xsl:text>
      <body>
        <xsl:text>&#10;&#32;&#32;</xsl:text>
        <xsl:comment><![CDATA[[if lte IE 8]>
        <script type="text/javascript">d.ieCheck["msie_ver_lte_8"] = true ;
        </script>
        <![endif]]]></xsl:comment>
        
        <xsl:text>&#10;&#32;&#32;</xsl:text>
        <xsl:comment><![CDATA[[if IE]>
        <script type="text/javascript">d.ieCheck["is_msie"] = true ;
        </script>
        <![endif]]]></xsl:comment>
        
        <xsl:text>&#10;&#32;&#32;</xsl:text>
        <!--div id="bodyDiv" class="bodyDiv" -->
        <div id="+" class="bodyDiv" >
          <xsl:text>&#10;&#32;&#32;&#32;&#32;</xsl:text>
          <div class="bodyHeaderTitle" >
            <xsl:value-of select="@title" />
            <xsl:text>&#10;&#32;&#32;&#32;&#32;</xsl:text>
          </div>
          
          <xsl:text>&#10;&#32;&#32;&#32;&#32;</xsl:text>
          <ul>
            <xsl:apply-templates/>
            <xsl:text>&#10;&#32;&#32;&#32;&#32;</xsl:text>
          </ul>
        <xsl:text>&#10;&#32;&#32;</xsl:text>
        </div>
        <span><div class="topLink" align="right" ><a href="#+">(top)</a></div></span>
      </body>
    </html>
  </xsl:template>
  
  <xsl:template name="js_config">
    <xsl:text>&#10;&#32;&#32;</xsl:text>
    <script type="text/javascript">
    <xsl:text>
      //<![CDATA[
      
      //jsWConfig //data
      //d={
      //  c: { // config consts
      d.c={
        babyBadBrowsers: true,
        babyBadBrowsers_sleep: 500,
        bodyDivId: '+',
        //bodyDivId: '0',
        //bodyDivId: '_',
        DEBUG: true,
        DEBUGN: 2,
        markupLinkRegexp: /(\[+)([^\[\]]+)\]+/g,
        noDispClass: 'noDisp',
        reload: true
      } ;
      
      //]]>
    </xsl:text>
    </script>
  </xsl:template>

</xsl:stylesheet>
