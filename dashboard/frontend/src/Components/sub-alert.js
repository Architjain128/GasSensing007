import React, { Component } from "react";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import '../files/css/login.css'
import axios from 'axios';

const state = {
    labels: ["9-11", "10-11", "11-11",
             "12-11", "13-11"],
    datasets: [
      {
        label: 'Gas Readings',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }

const columns = [
  { field: 'index', headerName: 'Index', width: 130 },
  { field: 'timestamp', headerName: 'Time Stamp', width: 130 },
  { field: 'reading', headerName: 'Reading', width: 130 },
  ];

  const rows = []

  // for alert page we need max 10 readings
  var max_readings = 10
  
  
  const xml2js = require('xml2js');
  
  // XML string to be parsed to JSON
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <m2m:cnt xmlns:m2m="http://www.onem2m.org/xml/protocols" xmlns:hd="http://www.onem2m.org/xml/protocols/homedomain" rn="Data">
     <ty>3</ty>
     <ri>/in-cse/cnt-554721369</ri>
     <pi>/in-cse/cnt-708562633</pi>
     <ct>20211028T013550</ct>
     <lt>20211028T013550</lt>
     <lbl>Team-15</lbl>
     <acpi>/in-cse/acp-516227225</acpi>
     <acpi>/in-cse/acp-511512795</acpi>
     <et>20221028T013550</et>
     <st>68</st>
     <mni>120</mni>
     <mbs>10000</mbs>
     <mia>0</mia>
     <cni>68</cni>
     <cbs>542</cbs>
     <m2m:cin rn="cin_308634801">
        <ty>4</ty>
        <ri>/in-cse/cin-308634801</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211110T225413</ct>
        <lt>20211110T225413</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>10</cs>
        <con>[test6346]</con>
     </m2m:cin>
     <m2m:cin rn="cin_778330669">
        <ty>4</ty>
        <ri>/in-cse/cin-778330669</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211110T231755</ct>
        <lt>20211110T231755</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>13</cs>
        <con>[time1,data1]</con>
     </m2m:cin>
     <m2m:cin rn="cin_789279776">
        <ty>4</ty>
        <ri>/in-cse/cin-789279776</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211110T231803</ct>
        <lt>20211110T231803</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>13</cs>
        <con>[time2,data2]</con>
     </m2m:cin>
     <m2m:cin rn="cin_807754686">
        <ty>4</ty>
        <ri>/in-cse/cin-807754686</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211110T231813</ct>
        <lt>20211110T231813</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>13</cs>
        <con>[time3,data3]</con>
     </m2m:cin>
     <m2m:cin rn="cin_386194953">
        <ty>4</ty>
        <ri>/in-cse/cin-386194953</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211110T233747</ct>
        <lt>20211110T233747</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>13</cs>
        <con>[time4,data4]</con>
     </m2m:cin>
     <m2m:cin rn="cin_425543199">
        <ty>4</ty>
        <ri>/in-cse/cin-425543199</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211110T235204</ct>
        <lt>20211110T235204</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>13</cs>
        <con>[time5,data5]</con>
     </m2m:cin>
     <m2m:cin rn="cin_240227884">
        <ty>4</ty>
        <ri>/in-cse/cin-240227884</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T012039</ct>
        <lt>20211111T012039</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>damn:damn</con>
     </m2m:cin>
     <m2m:cin rn="cin_152895151">
        <ty>4</ty>
        <ri>/in-cse/cin-152895151</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T012045</ct>
        <lt>20211111T012045</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>damn:damn</con>
     </m2m:cin>
     <m2m:cin rn="cin_39416915">
        <ty>4</ty>
        <ri>/in-cse/cin-39416915</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T012051</ct>
        <lt>20211111T012051</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>damn:damn</con>
     </m2m:cin>
     <m2m:cin rn="cin_267686076">
        <ty>4</ty>
        <ri>/in-cse/cin-267686076</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T012057</ct>
        <lt>20211111T012057</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>damn:damn</con>
     </m2m:cin>
     <m2m:cin rn="cin_648109326">
        <ty>4</ty>
        <ri>/in-cse/cin-648109326</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T012103</ct>
        <lt>20211111T012103</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>damn:damn</con>
     </m2m:cin>
     <m2m:cin rn="cin_49426531">
        <ty>4</ty>
        <ri>/in-cse/cin-49426531</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T012109</ct>
        <lt>20211111T012109</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>damn:damn</con>
     </m2m:cin>
     <m2m:cin rn="cin_423018049">
        <ty>4</ty>
        <ri>/in-cse/cin-423018049</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T012115</ct>
        <lt>20211111T012115</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>damn:damn</con>
     </m2m:cin>
     <m2m:cin rn="cin_617611476">
        <ty>4</ty>
        <ri>/in-cse/cin-617611476</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T012121</ct>
        <lt>20211111T012121</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>damn:damn</con>
     </m2m:cin>
     <m2m:cin rn="cin_672607326">
        <ty>4</ty>
        <ri>/in-cse/cin-672607326</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T012127</ct>
        <lt>20211111T012127</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>damn:damn</con>
     </m2m:cin>
     <m2m:cin rn="cin_338895269">
        <ty>4</ty>
        <ri>/in-cse/cin-338895269</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T012133</ct>
        <lt>20211111T012133</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>damn:damn</con>
     </m2m:cin>
     <m2m:cin rn="cin_178080014">
        <ty>4</ty>
        <ri>/in-cse/cin-178080014</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013034</ct>
        <lt>20211111T013034</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_628868606">
        <ty>4</ty>
        <ri>/in-cse/cin-628868606</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013040</ct>
        <lt>20211111T013040</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_544449913">
        <ty>4</ty>
        <ri>/in-cse/cin-544449913</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013518</ct>
        <lt>20211111T013518</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_956494493">
        <ty>4</ty>
        <ri>/in-cse/cin-956494493</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013524</ct>
        <lt>20211111T013524</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_887804112">
        <ty>4</ty>
        <ri>/in-cse/cin-887804112</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013556</ct>
        <lt>20211111T013556</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_303021696">
        <ty>4</ty>
        <ri>/in-cse/cin-303021696</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013630</ct>
        <lt>20211111T013630</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_280154063">
        <ty>4</ty>
        <ri>/in-cse/cin-280154063</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013636</ct>
        <lt>20211111T013636</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_984351275">
        <ty>4</ty>
        <ri>/in-cse/cin-984351275</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013642</ct>
        <lt>20211111T013642</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_217037020">
        <ty>4</ty>
        <ri>/in-cse/cin-217037020</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013649</ct>
        <lt>20211111T013649</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_154655534">
        <ty>4</ty>
        <ri>/in-cse/cin-154655534</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013701</ct>
        <lt>20211111T013701</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_930762626">
        <ty>4</ty>
        <ri>/in-cse/cin-930762626</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013707</ct>
        <lt>20211111T013707</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_570088132">
        <ty>4</ty>
        <ri>/in-cse/cin-570088132</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013714</ct>
        <lt>20211111T013714</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_680750375">
        <ty>4</ty>
        <ri>/in-cse/cin-680750375</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013720</ct>
        <lt>20211111T013720</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_244813325">
        <ty>4</ty>
        <ri>/in-cse/cin-244813325</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013727</ct>
        <lt>20211111T013727</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_435132780">
        <ty>4</ty>
        <ri>/in-cse/cin-435132780</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013733</ct>
        <lt>20211111T013733</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_153686786">
        <ty>4</ty>
        <ri>/in-cse/cin-153686786</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013739</ct>
        <lt>20211111T013739</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_921361013">
        <ty>4</ty>
        <ri>/in-cse/cin-921361013</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013745</ct>
        <lt>20211111T013745</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_530684389">
        <ty>4</ty>
        <ri>/in-cse/cin-530684389</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013752</ct>
        <lt>20211111T013752</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>01:29, 34</con>
     </m2m:cin>
     <m2m:cin rn="cin_98879836">
        <ty>4</ty>
        <ri>/in-cse/cin-98879836</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013824</ct>
        <lt>20211111T013824</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>2</cs>
        <con>34</con>
     </m2m:cin>
     <m2m:cin rn="cin_419817626">
        <ty>4</ty>
        <ri>/in-cse/cin-419817626</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013904</ct>
        <lt>20211111T013904</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>2</cs>
        <con>34</con>
     </m2m:cin>
     <m2m:cin rn="cin_206206299">
        <ty>4</ty>
        <ri>/in-cse/cin-206206299</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013910</ct>
        <lt>20211111T013910</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>2</cs>
        <con>34</con>
     </m2m:cin>
     <m2m:cin rn="cin_434962070">
        <ty>4</ty>
        <ri>/in-cse/cin-434962070</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T013941</ct>
        <lt>20211111T013941</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>2</cs>
        <con>34</con>
     </m2m:cin>
     <m2m:cin rn="cin_214406467">
        <ty>4</ty>
        <ri>/in-cse/cin-214406467</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014031</ct>
        <lt>20211111T014031</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>2</cs>
        <con>34</con>
     </m2m:cin>
     <m2m:cin rn="cin_293478523">
        <ty>4</ty>
        <ri>/in-cse/cin-293478523</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014038</ct>
        <lt>20211111T014038</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>2</cs>
        <con>34</con>
     </m2m:cin>
     <m2m:cin rn="cin_91199980">
        <ty>4</ty>
        <ri>/in-cse/cin-91199980</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014104</ct>
        <lt>20211111T014104</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>2</cs>
        <con>34</con>
     </m2m:cin>
     <m2m:cin rn="cin_19973741">
        <ty>4</ty>
        <ri>/in-cse/cin-19973741</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014206</ct>
        <lt>20211111T014206</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>2</cs>
        <con>34</con>
     </m2m:cin>
     <m2m:cin rn="cin_234078967">
        <ty>4</ty>
        <ri>/in-cse/cin-234078967</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014212</ct>
        <lt>20211111T014212</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>2</cs>
        <con>34</con>
     </m2m:cin>
     <m2m:cin rn="cin_813534860">
        <ty>4</ty>
        <ri>/in-cse/cin-813534860</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014212</ct>
        <lt>20211111T014212</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>damn:damn</con>
     </m2m:cin>
     <m2m:cin rn="cin_186818810">
        <ty>4</ty>
        <ri>/in-cse/cin-186818810</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014218</ct>
        <lt>20211111T014218</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>damn:damn</con>
     </m2m:cin>
     <m2m:cin rn="cin_5780507">
        <ty>4</ty>
        <ri>/in-cse/cin-5780507</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014240</ct>
        <lt>20211111T014240</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>2</cs>
        <con>34</con>
     </m2m:cin>
     <m2m:cin rn="cin_590042296">
        <ty>4</ty>
        <ri>/in-cse/cin-590042296</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014247</ct>
        <lt>20211111T014247</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>damn:damn</con>
     </m2m:cin>
     <m2m:cin rn="cin_512661559">
        <ty>4</ty>
        <ri>/in-cse/cin-512661559</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014309</ct>
        <lt>20211111T014309</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>14</cs>
        <con>[damn, damned]</con>
     </m2m:cin>
     <m2m:cin rn="cin_968580980">
        <ty>4</ty>
        <ri>/in-cse/cin-968580980</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014315</ct>
        <lt>20211111T014315</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>14</cs>
        <con>[damn, damned]</con>
     </m2m:cin>
     <m2m:cin rn="cin_439682569">
        <ty>4</ty>
        <ri>/in-cse/cin-439682569</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014321</ct>
        <lt>20211111T014321</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>14</cs>
        <con>[damn, damned]</con>
     </m2m:cin>
     <m2m:cin rn="cin_342018143">
        <ty>4</ty>
        <ri>/in-cse/cin-342018143</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014327</ct>
        <lt>20211111T014327</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>14</cs>
        <con>[damn, damned]</con>
     </m2m:cin>
     <m2m:cin rn="cin_596807898">
        <ty>4</ty>
        <ri>/in-cse/cin-596807898</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014333</ct>
        <lt>20211111T014333</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>14</cs>
        <con>[damn, damned]</con>
     </m2m:cin>
     <m2m:cin rn="cin_61235715">
        <ty>4</ty>
        <ri>/in-cse/cin-61235715</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014339</ct>
        <lt>20211111T014339</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>14</cs>
        <con>[damn, damned]</con>
     </m2m:cin>
     <m2m:cin rn="cin_539106623">
        <ty>4</ty>
        <ri>/in-cse/cin-539106623</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014652</ct>
        <lt>20211111T014652</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>14</cs>
        <con>[damn, damned]</con>
     </m2m:cin>
     <m2m:cin rn="cin_246439291">
        <ty>4</ty>
        <ri>/in-cse/cin-246439291</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014713</ct>
        <lt>20211111T014713</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>2</cs>
        <con>34</con>
     </m2m:cin>
     <m2m:cin rn="cin_936104795">
        <ty>4</ty>
        <ri>/in-cse/cin-936104795</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014718</ct>
        <lt>20211111T014718</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>6</cs>
        <con>damned</con>
     </m2m:cin>
     <m2m:cin rn="cin_841029741">
        <ty>4</ty>
        <ri>/in-cse/cin-841029741</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014722</ct>
        <lt>20211111T014722</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>2</cs>
        <con>34</con>
     </m2m:cin>
     <m2m:cin rn="cin_260668464">
        <ty>4</ty>
        <ri>/in-cse/cin-260668464</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014723</ct>
        <lt>20211111T014723</lt>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>6</cs>
        <con>damned</con>
     </m2m:cin>
     <m2m:cin rn="cin_227086565">
        <ty>4</ty>
        <ri>/in-cse/cin-227086565</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014751</ct>
        <lt>20211111T014751</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>3</cs>
        <con>b34</con>
     </m2m:cin>
     <m2m:cin rn="cin_354936994">
        <ty>4</ty>
        <ri>/in-cse/cin-354936994</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014804</ct>
        <lt>20211111T014804</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>3</cs>
        <con>b34</con>
     </m2m:cin>
     <m2m:cin rn="cin_725331352">
        <ty>4</ty>
        <ri>/in-cse/cin-725331352</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014810</ct>
        <lt>20211111T014810</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>3</cs>
        <con>b34</con>
     </m2m:cin>
     <m2m:cin rn="cin_607875974">
        <ty>4</ty>
        <ri>/in-cse/cin-607875974</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T014840</ct>
        <lt>20211111T014840</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>3</cs>
        <con>b34</con>
     </m2m:cin>
     <m2m:cin rn="cin_764443136">
        <ty>4</ty>
        <ri>/in-cse/cin-764443136</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T015237</ct>
        <lt>20211111T015237</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>3</cs>
        <con>b34</con>
     </m2m:cin>
     <m2m:cin rn="cin_269611005">
        <ty>4</ty>
        <ri>/in-cse/cin-269611005</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T015243</ct>
        <lt>20211111T015243</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>3</cs>
        <con>b34</con>
     </m2m:cin>
     <m2m:cin rn="cin_901963945">
        <ty>4</ty>
        <ri>/in-cse/cin-901963945</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T015312</ct>
        <lt>20211111T015312</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>[ 28, 34]</con>
     </m2m:cin>
     <m2m:cin rn="cin_932241692">
        <ty>4</ty>
        <ri>/in-cse/cin-932241692</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T015318</ct>
        <lt>20211111T015318</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>[ 28, 34]</con>
     </m2m:cin>
     <m2m:cin rn="cin_127012793">
        <ty>4</ty>
        <ri>/in-cse/cin-127012793</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T135106</ct>
        <lt>20211111T135106</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>[ 28, 34]</con>
     </m2m:cin>
     <m2m:cin rn="cin_826770048">
        <ty>4</ty>
        <ri>/in-cse/cin-826770048</ri>
        <pi>/in-cse/cnt-554721369</pi>
        <ct>20211111T135113</ct>
        <lt>20211111T135113</lt>
        <lbl>Label-1 Label-2</lbl>
        <st>0</st>
        <cnf>text/plain:0</cnf>
        <cs>9</cs>
        <con>[ 28, 34]</con>
     </m2m:cin>
     <ol>/in-cse/in-name/Team-15/Node-1/Data/ol</ol>
     <la>/in-cse/in-name/Team-15/Node-1/Data/la</la>
  </m2m:cnt>`;
  
  // convert XML to JSON
  xml2js.parseString(xml, (err, result) => {
      if(err) {
          throw err;
      }
  
      const json = JSON.stringify(result, null, 4);
      const obj = JSON.parse(json);
  
      var json_data = [] , temp_data = []
      temp_data = obj['m2m:cnt']['m2m:cin']
      for(var i=0;i<temp_data.length;i++)
      {
          json_data.push(temp_data[i]['con'])
      }
      var c = 0
      for(var i=0;i<json_data.length && c<max_readings;i++)
      {
          var str = json_data[i][0]
          var f = 0
          for(var j=0;j<str.length;j++)
          {
              if(str[j]==',')
              {
                  f=1
                  break
              }
          }
          if(f==1)
          {
              c+=1
              f = 0
              var time="",reading=""
              for(var j=1;j<str.length-1;j++)
              {
                  if(str[j]==',')
                  {
                      f=1
                      continue
                  }
                  if(f==0)
                  {
                      time += str[j]
                  }
                  else
                  {
                      reading += str[j]
                  }
              }
              rows.push({ id: c, index: c, timestamp: time, reading: reading })
          }
      }    
  });




  

export default class SubAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            last:""
        }
    }
    
    // initial call, or just call refresh directly
    componentDidMount(){
        async function aaa(){
            await axios.get("https://cors-anywhere.herokuapp.com/https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-15/Node-1/Data/?rcn=4",{
                headers : {
                        "X-M2M-Origin": "fRZvzNA7Bp:i43Yn0WPem",
                        // "Access-Control-Allow-Origin": "*",
                        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                    }
        
            })
            .then(function (res) {
                var json_data = [] , rows = [], temp_data = []
                temp_data = res.data['m2m:cnt']['m2m:cin']
                for(var i=0;i<temp_data.length;i++)
                {
                    json_data.push(temp_data[i]['con'])
                }
                for(var i=0;i<100 && i<json_data.length;i++)
                {
                    var time="",reading=""
                    var f = 0
                    for(var j=1;j<json_data[i].length-1;j++)
                    {
                        if(json_data[i][j]==',')
                        {
                            f=1
                            continue
                        }
                        if(f==0)
                        {
                            time += json_data[i][j]
                        }
                        else
                        {
                            reading += json_data[i][j]
                        }
                    }
                    rows.push({ id: i+1, index: i+1, timestamp: time, reading: reading })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        const refreshy=()=> {
            this.setState({last:new Date().toLocaleTimeString()})
            aaa()
            setTimeout(refreshy, 60*1000);
        }
        
        const getCookie=(cname) =>{
            let name = cname + "=";
            let ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        let coo = getCookie("gas-user-session");
        if(coo == ""){
            alert("Please login first!");
            window.location.href = "/";
        }
        else{
            this.setState({last:new Date().toLocaleTimeString()})
            aaa();
            setTimeout(refreshy, 60*1000);
        }
    }
    
    render() {
        return (
            <div>
            
            <div style={{height:"400px"}}>
            <h2>Below are the past alert values:</h2>
            <h3>All readings will be updated in 60 sec, last updated at {this.state.last}</h3>

                <DataGrid rows={rows} columns={columns}/>
            </div>
        </div>
        );
    }
} 