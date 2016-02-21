<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:import href="./mq.xsl" />
  <!--
  <xsl:output method="xml" indent="yes" omit-xml-declaration="no" />
  -->
  <xsl:output method="html" indent="yes" omit-xml-declaration="no" />

  <xsl:variable name="make_one_file" select="'false'" />

  <xsl:template match="/" >
    <xsl:choose>
      <xsl:when test="name(*)='mqDisp'" >
        <xsl:variable name="inputFile" select="normalize-space(.)" />
        <xsl:apply-templates select="document($inputFile)"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="/*/*" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
</xsl:stylesheet>
