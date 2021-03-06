
      var d ;
      if (!window.console) console = {log: function(arg) {}} ;
      if ( typeof d == 'undefined' ) {
        d={} ;
      }
      d.v = { // vars
        newLinesBetweenDivs: 70,
      };
      
      d.main = function() {
          if ( !d.v["init"] ) {
            d.tryMakeLinks() ;
            d.divNewlines() ;
            d.v["init"] = true ;
          }
      };
      d.linkIt = function(divId, linkTerm, link) {
          var div=document.getElementById(divId) ;
          var txt=div.innerHTML ;
          var replacement = '<a href="' + link + '" onclick="d.refreshAnchorOnClick(event)">' + linkTerm + '</a>' ;
          var tmpRegExp = new RegExp( '\\[+' + linkTerm + '\\]+', 'g' );
          txt = txt.replace( tmpRegExp, replacement ) ;
          div.innerHTML = txt ;
      };
      d.linkItIfItExists = function(divId, linkTerm, altText) {
          var result='' ;
          if (typeof altText === 'undefined') { altText = linkTerm; }
          var ids = [linkTerm, linkTerm.replace(/ /g, '_'),
            linkTerm.replace(/_/g, ' '),
            linkTerm.replace(/ /g, '_').replace(/'/g, '%27'),
            linkTerm.replace(/ /g, '_').replace(/'/g, '').replace(/%27/g, ''),
            linkTerm.replace(/ /g, '%20')
          ] ;
          for (var i=0 ; i < ids.length; i++) {
            var id = ids[i] ;
            var divById=document.getElementById(id) ;
            if (divById){
              result='#' + id ;
            }
            if ( result !== '' ) {
              break ;
            }
          }
          if ( result !== '' ) {
            //d.linkIt(divId, linkTerm, result) ;
            d.linkIt(divId, altText, result) ;
          }
          return result ;
      };
      d.insertAfter = function(newNode, refNode) {
        //refNode.parentNode.appendChild(newNode);
        refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
      };
      d.addNewlinesToDiv = function(div){
        var type=div.getAttribute("data-type") ;
        if (type !== 'nowiki') {
          console.log("Newline-ing div '" + div.tagName + "' '" + div.getAttribute("id") + "'") ;
          var newAtt = document.createAttribute('data-type') ;
          newAtt.value = 'nowiki' ;
          var newDiv = document.createElement('div');
          newDiv.setAttributeNode(newAtt);
          var newTxt = document.createTextNode("\n");
          // // div.parentNode.appendChild(newTxt);
          // d.insertAfter(newTxt, div) ;
          newDiv.appendChild(newTxt) ;
          //for (var i = 0; i < 10; i++) { 
          for (var i = 0; i < d.v['newLinesBetweenDivs']; i++) { 
            var newBr = document.createElement('br');
            // //div.parentNode.appendChild(newBr);
            // d.insertAfter(newBr, div) ;
            newDiv.appendChild(newBr) ;
            var newTxt = document.createTextNode("\n");
            // //div.parentNode.appendChild(newTxt);
            // d.insertAfter(newTxt, div) ;
            newDiv.appendChild(newTxt) ;
            console.log( "i " + i + " n " + d.v['newLinesBetweenDivs'])
          }
          d.insertAfter(newDiv, div) ;
        }
      };
      d.divNewlines = function(div){
        var divs = document.getElementsByTagName('div') ;
        for(var i=0; i<divs.length; i++) {
          if (divs[i].getAttribute){
            var type=divs[i].getAttribute("data-type") ;
            if (type !== 'nowiki') {
              d.addNewlinesToDiv(divs[i]) ;
            }
          }
        }
      }
      d.tryMakeLinks = function(){
          var divs = document.body.childNodes ;
          for(var i=0; i<divs.length; i++) {
            if (divs[i].getAttribute){
              var id=divs[i].getAttribute("id") ;
              var type=divs[i].getAttribute("data-type") ;
              var t=divs[i].tagName ;
              if ( t.match(/div/i) ) {
                if (type !== 'nowiki') {
                  //d.addNewlines(divs[i]) ;
                  // d.v["divOrder"].push(id) ;
                  // d.v["divList"][id] = 1 ;
                  var txt=divs[i].innerHTML ;
                  var result ;
                  while ((result = d.c["markupLinkRegexp"].exec(txt)) !== null){
                    var ref=result[2] ;
                    //if ( ref.match(/^(.*)[|]([^|]+)$/) ) {
                    var altText=ref ;
                    var altTextRegExp = /^(.*)[|]([^|]+)$/;
                    var altTextResult ;
                    if ( altTextResult = altTextRegExp.exec(altText) !== null ) {
                      var actualRef = result[1] ;
                      altText = result[2] ;
                      console.log( 'For ref ' + ref + ', actual ref (' + actualRef + ') and altText (' + altText + ').' ) ;
                    }
                    if ( ref.match(/[<>]/) || ref.match(/^a\s/) ) {
                      (d.c.DEBUGN > 0) && console.log( 'Skipping linking this complex HTML ref: ' + ref ) ;
                      continue ;
                    } else if ( ref.match(/^[0-9]+$/) ) {
                      (d.c.DEBUGN > 0) && console.log( 'Skipping linking this numeric ref: ' + ref ) ;
                      continue ;
                    } else {
                      (d.c.DEBUGN > 0) && console.log( 'Linking this ref: ' + ref ) ;
                    }
                    var sqBrackets=result[1] ;
                    if (sqBrackets == '[[') { // Non-URI
                      d.linkItIfItExists( id, ref, altText );
                    } else { // URI
                    
                      d.linkIt(id, ref, ref) ;
                    }
                  }
                } // if nowiki
              } // if div
            } // if getAttribute
          } // for each child
      };
      d.windowOnload = function() {
        d.main() ;
      };
        
      window.onload = d.windowOnload ;

//
