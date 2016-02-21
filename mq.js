
      var d ;
      if (!window.console) console = {log: function(arg) {}} ;
      if ( typeof d == 'undefined' ) {
        d={} ;
      }
      d.ieCheck = { // browser check
      };
      d.v = { // vars
        divOrder: [],
        divList: {}
      };
      d.addSiblingDivClass = function(tgtDiv,addedClass){
          var tagName = tgtDiv.tagName ? tgtDiv.tagName : '' ;
          if ( tagName == 'DIV') {
            if ( !tgtDiv.className.match( addedClass ) ) {
              tgtDiv.className += tgtDiv.className ? " " + addedClass : addedClass ;
            }
          } else {
            if ( tagName == 'BODY') {
              return true ;
            } else {
              if ( tagName !== '') {
                d.c.DEBUG && console.log("addSiblingDivClass tagName " + tagName ) ;
              }
            }
          }
          tgtDiv.nextSibling && d.addSiblingDivClass(tgtDiv.nextSibling,addedClass)  ;
          return true ;
      };
      d.displayOnlyAnchor_div = function(div) {
          var nodeValue = div.nodeValue ? div.nodeValue : '' ;
          var tagName = div.tagName ? div.tagName : '' ;
          var id = (div.getAttribute && div.getAttribute('id') ) ? div.getAttribute('id') : '' ;
          (d.c.DEBUGN > 1) && console.log( 'displayOnlyAnchor_div for id ' + id ) ;
          (d.c.DEBUGN > 2) && console.log( 'displayOnlyAnchor_div for id ' + id + ' (nodeValue = q{'+nodeValue+'}).') ;
          if ( tagName == 'DIV') {
            if (id == d.v["section"]) {
              //jsWConfig["displayDiv"] += 1 ;
              d.removeClass(div, d.c["noDispClass"]) ;
            //} else {
            }
            
            // QQQ: Is this still necessary?
            if ( !div.className.match( 'OtherDivs' ) ) {
              div.className += div.className ? ' OtherDivs' : 'OtherDivs' ;
            }
            //
            
          }
          div.nextSibling && d.displayOnlyAnchor( div.nextSibling ) ;
      };
      d.displayOnlyAnchor = function(div) {
          if ( d.v["section"] ) {
            if ( div ) {
              d.displayOnlyAnchor_div(div) ;
            } else {
              //if (d.v["section"] == '+') {
              if (d.v["section"] == d.c['bodyDivId']) {
                (d.c.DEBUGN > 1) && console.log( 'Removing all noDisp classes.' ) ;
                //var allNoDisps = document.getElementsByClassName(d.c["noDispClass"]);
                var allNoDisps ;
                if ( document.querySelectorAll ) {
                  allNoDisps = document.querySelectorAll("div." + d.c["noDispClass"]);
                } else {
                  console.log("ERROR:  Failed to find querySelectorAll!  Must be IE8 quirks mode or something.") ;
                  allNoDisps = document.getElementsByTagName('div') ;
                }
                var i;
                for (i = 0; i < allNoDisps.length; i++) {
                  (d.c.DEBUGN > 1) && console.log( 'Removing all noDisp classes: Class # ' + i ) ;
                  d.removeClass(allNoDisps[i], d.c["noDispClass"]) ;
                }
              } else {
                //d.displayOnlyAnchor(document.getElementById('bodyDiv').firstChild) ;
                //d.displayOnlyAnchor(document.getElementById(d.c["bodyDivId"]).firstChild) ;
                d.displayOnlyAnchor(document.getElementById(d.c["bodyDivId"])) ;
                var tgtDiv=document.getElementById(d.v["section"]) ;
                if ( tgtDiv ) {
                  (d.c.DEBUGN > 1) && console.log( 'Found tgtDiv for section.' ) ;
                  d.addSiblingDivClass(tgtDiv.parentNode.firstChild, d.c["noDispClass"]) ;
                  d.removeParentDivClass(tgtDiv, d.c["noDispClass"]) ;
                }
              }
            }
          //} else {
            //displayOnlyAnchor_removeStyle() ;
            
          }
                
      };
      d.getAnchorHash = function() {
        if ( d.c.DEBUGN > 1 ) {
          console.log("getAnchorHash window.location.hash " + window.location.hash ) ;
          console.log("getAnchorHash window.location.href " + window.location.href ) ;
          console.log("getAnchorHash window.location " + window.location ) ;
        }
        return unescape(window.location.hash.replace(new RegExp("^[#]"), ""));  
      };
      d.linkIt = function(divId, linkTerm, link) {
          var div=document.getElementById(divId) ;
          var txt=div.innerHTML ;
          var replacement = '<a href="' + link + '" onclick="d.refreshAnchorOnClick(event)">' + linkTerm + '</a>' ;
          var tmpRegExp = new RegExp( '\\[+' + linkTerm + '\\]+', 'g' );
          txt = txt.replace( tmpRegExp, replacement ) ;
          div.innerHTML = txt ;
      };
      d.linkItIfItExists = function(divId, linkTerm) {
          var result='' ;
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
            d.linkIt(divId, linkTerm, result) ;
          }
          return result ;
      };
      d.main = function() {
          // if ( !( typeof d.v["newIeHash"] == 'undefined' ) ) {
          //   console.log("Good:  NewIeHash = " + d.v["newIeHash"]) ;
          //   //window.location.hash = d.v["newIeHash"] ;
          // }
          if ( !d.v["init"] ) {
            d.tryMakeLinks() ;
            d.v["init"] = true ;
          }
          if ( !d.v["mainLock"] ) {
            d.v["mainLock"] = true ;
            d.v["section"] = d.getAnchorHash() ;
            //d.c.DEBUG && console.log("anchor hash " + d.v["section"]) ;
            d.c.DEBUG && console.log("section " + d.v["section"]) ;
            // if ( d.v["section"] === "" || d.v["section"] === "+" ) {
            //     console.log("blank section so redirecting") ;
            //     d.redirect('#+') ;
            //     console.log("blank section so redirected") ;
            // }
            if ( d.v["section"] !== d.v["mainLockLast"] ) {
              // if ( typeof d.v["mainLockLast"] == 'undefined' ) {
              //   console.log(" ") ;
              // } else if ( d.v["mainLockLast"] === "+" ) {
              //   console.log(" ") ;
              // } else if ( d.v["mainLockLast"] === "+" ) {
              //   console.log("d.v[section] = " + d.v["section"]) ;
              //   console.log("d.v[mainLockLast] = " + d.v["mainLockLast"]) ;
              //   if ( d.v["section"] === "" ) {
              //     d.v["section"] = d.v["mainLockLast"] ;
              //   }
              //   console.log(" ") ;
              // }
              if ( d.v["section"] === "" ) {
                if ( d.c.DEBUGN > 1 ) {
                  console.log("  d.v[section] = " + d.v["section"]) ;
                  console.log("  d.v[mainLockLast] = " + d.v["mainLockLast"]) ;
                  console.log("  blank section so redirecting") ;
                }
                //d.redirect('#+') ;
                //d.redirect('+') ;
                d.redirect(d.c["bodyDivId"]) ;
                if ( d.c.DEBUGN > 1 ) {
                  console.log("  blank section so redirected") ;
                  console.log(" ") ;
                }
              // } else if ( d.v["section"] === "+" ) {
              //   console.log("  d.v[section] = " + d.v["section"]) ;
              //   console.log("  d.v[mainLockLast] = " + d.v["mainLockLast"]) ;
              //   console.log("  plus section") ;
              //   console.log(" ") ;
              }
              d.displayOnlyAnchor() ;
              d.watchForBrowserBackButton() ;
              d.v["mainLockLast"] = d.v["section"] ;
            }
            d.v["mainLock"] = false ;
          } else {
            d.c.DEBUG && console.log( "mainLock (already locked)" ) ;
          }
          (d.c.DEBUGN > 1 ) && console.log("  (end of main())") ;
          (d.c.DEBUGN > 0 ) && console.log(" ") ;
          return true ;
      };
      d.redirect = function(linkHref) {
        (d.c.DEBUGN > 0) && console.log( 'd.v["section"] (' + d.v["section"] +
          ') !== linkHref (' + linkHref + ')'
        ) ;
        if ( !(linkHref.match(/^[#]/)) ) {
          linkHref = '#' + linkHref ;
        }
        (d.c.DEBUGN > 1) && console.log( 'window (' + window + ') .location (' + window.location + ')' ) ;
        //var baseLocation = new String(window.location).replace(new RegExp("[#].+$"), "" ) ;
        //var baseLocation = window.location.replace(new RegExp("[#].+$"), "" ) ;
        var origLoc = window.location ;
        //var baseLocation = new String(origLoc).replace(new RegExp("[#].+$"), "" ) ;
        var baseLocation = String(origLoc).replace(new RegExp("[#].+$"), "" ) ;
        if ( d.ieCheck["msie_ver_lte_8"] ) {
          var regExp1 = /^(http[s]...*)[\/]([^\/]+)([#]|$)/ ;
          var regExp2 = /^(http[s]...*)[\/][\/]([^\/]+)([#]|$)/ ;
          //if ( baseLocation.match(regExp1) ) {
          if ( regExp2.test(baseLocation) ) {
            (d.c.DEBUGN > 1) && console.log("baseLocation (found double) before " + baseLocation) ;
            baseLocation = String(baseLocation).replace(regExp2, "$1/$2") ;
            (d.c.DEBUGN > 1) && console.log("baseLocation (found double) after " + baseLocation) ;
          } else {
            (d.c.DEBUGN > 1) && console.log("baseLocation (found single) before " + baseLocation) ;
            baseLocation = String(baseLocation).replace(regExp1, "$1//$2") ;
            (d.c.DEBUGN > 1) && console.log("baseLocation (found single) after " + baseLocation) ;
          }
        }
        var newLoc = baseLocation + linkHref ;
        
        window.location.assign(newLoc) ;
        d.v["newIeHash"] = linkHref ;
        window.location.hash = d.v["newIeHash"] ;
        
        //if ( false ) {
          if ( d.ieCheck["msie_ver_lte_8"] ) {
            (d.c.DEBUGN > 1) && console.log( "Trying to force location." ) ;
            window.location = newLoc ;
            if (d.c.DEBUGN > 1) {
              console.log( 'force new location newLoc ('+newLoc+')' ) ;
              console.log( ' window (' + window + ')' ) ;
              console.log( '  .location (' + window.location + ')' ) ;
            }
          }
        //}
        
        
        if ( d.c["reload"] && d.ieCheck["msie_ver_lte_8"] ) {
          if ( false ) {
            (d.c.DEBUGN > 1) && console.log( 'location ('+location+')' ) ;
            (d.c.DEBUGN > 1) && console.log( 'location.reload()' ) ;
            //location.reload() ;
            window.location.reload() ;
          }
        }
        if (d.c.DEBUGN > 1) {
          console.log( 'After redirect:' ) ;
          console.log( ' newLoc ('+newLoc+')' ) ;
          console.log( '  window (' + window + ')' ) ;
          console.log( '   .location (' + window.location + ')' ) ;
          console.log( '    .hash (' + window.location.hash + ')' ) ;
          console.log( '    .href (' + window.location.href + ')' ) ;
        }
        
      };
      d.refreshAnchorOnClick = function(e) {
          //var linkHref = e.target.getAttribute('href') ;
          // IE 8
          e = e || window.event ;
          var target = e.target || e.srcElement ;
          var linkHref = target.getAttribute('href') ;
          if ( d.ieCheck["msie_ver_lte_8"] ) {
            //var match = new RegExp("^.*([#][^#]+)$").exec(new String(linkHref)) ;
            var match = new RegExp("^.*([#][^#]+)$").exec( String(linkHref)) ;
            //console.log( "Ah, IE8 or lower, you're so stupid.  New linkHref = " + match[1] ) ;
            console.log( "Ah, IE8 or lower, you're so stupid.  Old linkHref = " + linkHref + ".  New linkHref = " + match[1] ) ;
            linkHref = match[1] ;
          }
          //if ( getAnchorHash() != linkHref ) {
          if ( d.v["section"] !== linkHref ) {
            d.redirect(linkHref) ;
          }
      };
      d.removeClass = function(tgtDiv,removedClass){
        if (d.c.DEBUGN > 1) {
          var id = (tgtDiv.getAttribute && tgtDiv.getAttribute('id') ) ? tgtDiv.getAttribute('id') : '' ;
          console.log( 'removeClass for id ' + id + ' (' + tgtDiv.className + ')') ;
        }
        tgtDiv.className = tgtDiv.className.replace(
          new RegExp("(?:^|\\s)" +
          removedClass +
          "(?!\\S)" , "g"), '' )
        ;
      };
      d.removeParentDivClass = function(tgtDiv,removedClass){
          d.c.DEBUG && console.log("removeParentDivClass " + tgtDiv.tagName 
            + " " + tgtDiv.getAttribute("id") + " " + removedClass ) ;
          d.removeClass(tgtDiv,removedClass) ;
          tgtDiv.parentNode &&
            tgtDiv.parentNode.className &&
            d.removeParentDivClass(tgtDiv.parentNode,removedClass)
          ;
      };
      d.tryMakeLinks = function(){
          var divs = document.body.childNodes ;
          for(var i=0; i<divs.length; i++) {
            if (divs[i].getAttribute){
              var id=divs[i].getAttribute("id") ;
              var type=divs[i].getAttribute("data-type") ;
              var t=divs[i].tagName ;
              if ( t.match(/div/i) ) {
                if (type !== 'pretty') {
                  d.v["divOrder"].push(id) ;
                  d.v["divList"][id] = 1 ;
                  var txt=divs[i].innerHTML ;
                  var result ;
                  while ((result = d.c["markupLinkRegexp"].exec(txt)) !== null){
                    var ref=result[2] ;
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
                      d.linkItIfItExists( id, ref );
                    } else { // URI
                      d.linkIt(id, ref, ref) ;
                    }
                  }
                //} else { // Already pretty
                  //;
                } // if pretty else
              } // if div
            } // if getAttribute
          } // for each child
      };
      d.watchForBrowserBackButton = function() {
          if (("onhashchange" in window) && d.ieCheck["not_msie"]) {
            window.onhashchange = function () {
              d.main() ;
            } ;
          } else {
            if (d.c["babyBadBrowsers"] && !d.v["babyBadBrowsers_done"]) {
              var prevHash = window.location.hash;
              window.setInterval(function () {
                if (window.location.hash !== prevHash) {
                  prevHash = window.location.hash; // Why? QQQ
                  d.main() ;
                }
              }, d.c["babyBadBrowsers_sleep"]);
              if ( d.c["DEBUGN"] > 1) {
                console.log( " " ) ;
                console.log( "Turning off babyBadBrowsers to avoid stacking them up." ) ;
                console.log( " " ) ;
              }
              d.v["babyBadBrowsers_done"] = true ;
            }
          }
      };
      d.windowOnload = function() {
        (d.c.DEBUGN > 1) && console.log("Howdy.") ;

        if ( d.ieCheck["is_msie"] ) {
          d.ieCheck["not_msie"] = false ;
        } else {
          d.ieCheck["not_msie"] = true ;
        }
        
        if ( d.c.DEBUGN > 1 ) {
          console.log("msie_ver_lte_8 " + d.ieCheck["msie_ver_lte_8"]) ;
          console.log("not_msie " + d.ieCheck["not_msie"]) ;
          console.log("is_msie " + d.ieCheck["is_msie"]) ;
        }
        
        // // Test experiment:
        // var div1=document.getElementById('div1') ;
        // div1.className += div1.className ? " " : '' + "noDisp" ;
        
        d.main() ;
      };
        
      window.onload = d.windowOnload ;

//
