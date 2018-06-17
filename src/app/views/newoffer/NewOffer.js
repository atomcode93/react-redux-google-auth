// @flow weak

import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';


import {
  Alert,
  AnimatedView,
  Panel,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol
} from '../../components';

import Modal from 'react-modal';

import Highlight from 'react-highlight';
import './style.css'
import moment from 'moment';

import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import logo from "./logo.png"
import * as offer from "../../services/API/newOffer"



// import {urlExists} from 'url-exists'
Number.prototype.formatMoney = function (c, d, t) {
  var n = this;
  c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

Number.prototype.formatDec = function () {
  let c = 2;
  let d = ',';
  let t = '.';
  var n = this;
  c = isNaN(c = Math.abs(c)) ? 2 : c;
  d = d == undefined ? "." : d;
  t = t == undefined ? "," : t;
  let s = n < 0 ? "-" : "";
  let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
  let j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

Number.prototype.formatInt = function () {
  let c = 0;
  let d = ',';
  let t = '.';
  var n = this;
  c = isNaN(c = Math.abs(c)) ? 2 : c;
  d = d == undefined ? "." : d;
  t = t == undefined ? "," : t;
  let s = n < 0 ? "-" : "";
  let i = String(Number(n = Math.abs(Number(n) || 0).toFixed(c)));
  let j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

const nomiMesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

//const headersOfferte =  ['#', 'Offerta', 'KAM', 'Scadenza', 'Importo €', 'Consumo kWh', 'Stato', 'Progress'];
const headersOfferte = ['#', 'Cliente', 'Offerta', 'Fornitura', 'Creazione'];

const content = [
  ['1', 'Fonderia  AAA', 'Augusto Provetta', '10/04/2018 11:00', '20.000', '50', <span className="label label-danger">in progress</span>, <span className="badge badge-info">50%</span>],
  ['2', 'Panificio BBB', 'Augusto Provetta', '09/04/2018 15:00', '19.000', '40', <span className="label label-success">completed</span>, <span className="badge badge-success">100%</span>],
  ['3', 'Lavanderia CCC', 'Augusto Provetta', '08/04/2018 18:00', '22.000', '40', <span className="label label-warning">in progress</span>, <span className="badge badge-warning">75%</span>],
  ['4', 'Autoriparazioni', 'Gianni Responsabile', '09/04/2018 12:00', '20.000', '40', <span className="label label-info">in progress</span>, <span className="badge badge-info">65%</span>],
  ['5', 'Estetica', 'Augusto Provetta', '07/04/2018 13:00', '21.000', '40', <span className="label label-warning">in progress</span>, <span className="badge badge-danger">95%</span>],
  ['6', 'Palestra', 'Augusto Provetta', '06/04/2018 14:00', '30.000', '40', <span className="label label-info">in progress</span>, <span className="badge badge-success">95%</span>],
  ['7', 'Residence', 'Augusto Provetta', '05/04/2018 18:00', '10.000', '40', <span className="label label-info">in progress</span>, <span className="badge badge-success">95%</span>]
];
const verificaStyles = {
  content: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    width: "400px",
    height: "400px",
  }
};
const offerteStyles = {
  content: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "px",
    right: 0,
    margin: "auto",
    width: "80%",
    height: "400px",
  }
};

function monthDiff(d1, d2) {
  var months;
  if (d1 > d2) return 0;
  if (d1 == d2) return 1;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months < 0 ? 0 : months + 1;
}

function meseAnno2Date(s) {
  var am = s.split(" ");
  return new Date(am[1], nomiMesi.indexOf(am[0].toLowerCase()), 1);

}

class NewOffer extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      enterNewOffer: PropTypes.func.isRequired,
      leaveNewOffer: PropTypes.func.isRequired
    })
  };

  state = { path: ['home', 'newoffer'] };

  async componentDidMount() {
    await offer.getOffer().then((resulte) => {
      this.setState({
        infoOffer: resulte.offerte,
        data: resulte.dataagg[0],
        cliente: resulte.offerte[0].cliente,
        indirizzo: resulte.offerte[0].indirizzo,
        localita: resulte.offerte[0].localita,
        info: resulte.offerte[0],
        ore_validita: resulte.offerte[0].ore_validita,
        gennaioF1: resulte.offerte[0].genF1,
        gennaioF2: resulte.offerte[0].genF2,
        gennaioF3: resulte.offerte[0].genF3,
        gennaioPeak: resulte.offerte[0].genOP,
        gennaioOffPeak: resulte.offerte[0].genPL,
        febbraioF1: resulte.offerte[0].febF1,
        febbraioF2: resulte.offerte[0].febF2,
        data_validita: resulte.offerte[0].data_validita,
        febbraioF3: resulte.offerte[0].febF3,
        febbraioPeak: resulte.offerte[0].febOP,
        febbraioOffPeak: resulte.offerte[0].febPL,
        marzoF1: resulte.offerte[0].marF1,
        marzoF2: resulte.offerte[0].marF2,
        marzoF3: resulte.offerte[0].marF3,
        marzoPeak: resulte.offerte[0].marOP,
        marzoOffPeak: resulte.offerte[0].marPL,
        aprileF3: resulte.offerte[0].aprF3,
        aprileF2: resulte.offerte[0].aprF2,
        aprileF1: resulte.offerte[0].aprF3,
        aprilePeak: resulte.offerte[0].aprOP,
        aprileOffPeak: resulte.offerte[0].aprPL,
        maggioF1: resulte.offerte[0].magF1,
        maggioF2: resulte.offerte[0].magF2,
        maggioF3: resulte.offerte[0].magF3,
        maggioPeak: resulte.offerte[0].magOP,
        maggioOffPeak: resulte.offerte[0].magPL,
        giugnoF1: resulte.offerte[0].giuF1,
        giugnoF2: resulte.offerte[0].magF2,
        giugnoF3: resulte.offerte[0].magF3,
        giugnoPeak: resulte.offerte[0].magOP,
        giugnoOffPeak: resulte.offerte[0].magPL,
        luglioF1: resulte.offerte[0].lugF1,
        luglioF2: resulte.offerte[0].lugF2,
        luglioF3: resulte.offerte[0].lugF3,
        luglioPeak: resulte.offerte[0].lugOP,
        luglioOffPeak: resulte.offerte[0].lugPL,
        agostoF1: resulte.offerte[0].agoF1,
        agostoF2: resulte.offerte[0].agoF2,
        agostoF3: resulte.offerte[0].agoF3,
        agostoPeak: resulte.offerte[0].agoOP,
        agostoOffPeak: resulte.offerte[0].agoPL,
        settembreF1: resulte.offerte[0].setF1,
        settembreF2: resulte.offerte[0].setF2,
        settembreF3: resulte.offerte[0].setF3,
        settembrePeak: resulte.offerte[0].setOP,
        settembreOffPeak: resulte.offerte[0].setPL,
        ottobreF1: resulte.offerte[0].ottF1,
        ottobreF2: resulte.offerte[0].ottF2,
        ottobreF3: resulte.offerte[0].ottF3,
        ottobrePeak: resulte.offerte[0].ottOP,
        ottobreOffPeak: resulte.offerte[0].ottPL,
        novembreF1: resulte.offerte[0].novF1,
        novembreF2: resulte.offerte[0].novF2,
        novembreF3: resulte.offerte[0].novF3,
        novembrePeak: resulte.offerte[0].novOP,
        novembreOffPeak: resulte.offerte[0].novPL,
        dicembreF1: resulte.offerte[0].dicF1,
        dicembreF2: resulte.offerte[0].decF2,
        dicembreF3: resulte.offerte[0].dicF3,
        dicembrePeak: resulte.offerte[0].dicOP,
        dicembreOffPeak: resulte.offerte[0].dicPL,
        feeEco: resulte.offerte[0].feeEco,
        feeIntermediario: resulte.offerte[0].feeIntermediario,
        tipoConsumi: resulte.offerte[0].tipoConsumi,
        consumoAnnuoF1: resulte.offerte[0].consumoAnnuoF1,
        consumoAnnuoF2: resulte.offerte[0].consumoAnnuoF2,
        consumoAnnuoF3: resulte.offerte[0].consumoAnnuoF3,
        consumoAnnuoOP: resulte.offerte[0].consumoAnnuoOP,
        consumoAnnuoPL: resulte.offerte[0].consumoAnnuoPL,
        fine_forn: resulte.offerte[0].fine_forn,
        inizio_forn: resulte.offerte[0].inizio_forn,
        // inizio_forn_select: -1,
        tipoSbilanciamento: resulte.offerte[0].tipoSbilanciamento,
        labels: resulte.labels,
        ore_F1: resulte.ore_F1,
        ore_F2: resulte.ore_F2,
        ore_F3: resulte.ore_F3,
        ore_OP: resulte.ore_OP,
        ore_PL: resulte.ore_PL,
        ore_TOT: resulte.ore_TOT
      })
    })
  }

  componentWillMount() {
    const { actions: { enterNewOffer } } = this.props;
    enterNewOffer();
  }

  Verifica() {
    /* for (let prop in this.state.Verifica) {
      if (this.state.Verifica[prop] === 0) {
        let mess = this.state.errorValida
        mess.push(prop)
        this.setState({errorValida: mess})
      }
    } */

    let errori = [];

    //console.log("-" + this.state.cliente + "-" );
    if (!this.state.cliente)
      errori.push("Inserire Cliente");
    if (!this.state.indirizzo)
      errori.push("Inserire Indirizzo");
    if (!this.state.localita)
      errori.push("Inserire Cap e Località");
    if (!this.state.inizio_forn)
      errori.push("Inserire Inizio Fornitura");
    if (!this.state.fine_forn)
      errori.push("Inserire Fine Fornitura");
    if (this.state.labels.indexOf(this.state.inizio_forn) > this.state.labels.indexOf(this.state.fine_forn))
      errori.push("Inizio Fornitura incongruente con Fine Fornitura");
    if (!this.state.data_validita)
      errori.push("Inserire Data Validità Offerta");
    if (!this.state.ore_validita)
      errori.push("Inserire Orario Validità Offerta");
    if (moment(this.state.data_validita + " " + this.state.ore_validita, "DD/MM/YYYY H:mm") < moment(new Date()))
      errori.push("Data e Ora Validità Inferiore ad adesso");

    if (this.state.tipoConsumi === "Mensili") {

      if (
        Number(this.state.gennaioF1) <= 0
        || Number(this.state.gennaioF2) <= 0
        || Number(this.state.gennaioF3) <= 0
        || Number(this.state.gennaioPeak) <= 0
        || Number(this.state.gennaioOffPeak) <= 0
        || Number(this.state.febbraioF1) <= 0
        || Number(this.state.febbraioF2) <= 0
        || Number(this.state.febbraioF3) <= 0
        || Number(this.state.febbraioPeak) <= 0
        || Number(this.state.febbraioOffPeak) <= 0
        || Number(this.state.marzoF1) <= 0
        || Number(this.state.marzoF2) <= 0
        || Number(this.state.marzoF3) <= 0
        || Number(this.state.marzoPeak) <= 0
        || Number(this.state.marzoOffPeak) <= 0
        || Number(this.state.aprileF3) <= 0
        || Number(this.state.aprileF2) <= 0
        || Number(this.state.aprileF1) <= 0
        || Number(this.state.aprilePeak) <= 0
        || Number(this.state.aprileOffPeak) <= 0
        || Number(this.state.maggioF1) <= 0
        || Number(this.state.maggioF2) <= 0
        || Number(this.state.maggioF3) <= 0
        || Number(this.state.maggioPeak) <= 0
        || Number(this.state.maggioOffPeak) <= 0
        || Number(this.state.giugnoF1) <= 0
        || Number(this.state.giugnoF2) <= 0
        || Number(this.state.giugnoF3) <= 0
        || Number(this.state.giugnoPeak) <= 0
        || Number(this.state.giugnoOffPeak) <= 0
        || Number(this.state.luglioF1) <= 0
        || Number(this.state.luglioF2) <= 0
        || Number(this.state.luglioF3) <= 0
        || Number(this.state.luglioPeak) <= 0
        || Number(this.state.luglioOffPeak) <= 0
        || Number(this.state.agostoF1) <= 0
        || Number(this.state.agostoF2) <= 0
        || Number(this.state.agostoF3) <= 0
        || Number(this.state.agostoPeak) <= 0
        || Number(this.state.agostoOffPeak) <= 0
        || Number(this.state.settembreF1) <= 0
        || Number(this.state.settembreF2) <= 0
        || Number(this.state.settembreF3) <= 0
        || Number(this.state.settembrePeak) <= 0
        || Number(this.state.settembreOffPeak) <= 0
        || Number(this.state.ottobreF1) <= 0
        || Number(this.state.ottobreF2) <= 0
        || Number(this.state.ottobreF3) <= 0
        || Number(this.state.ottobrePeak) <= 0
        || Number(this.state.ottobreOffPeak) <= 0
        || Number(this.state.novembreF1) <= 0
        || Number(this.state.novembreF2) <= 0
        || Number(this.state.novembreF3) <= 0
        || Number(this.state.novembrePeak) <= 0
        || Number(this.state.novembreOffPeak) <= 0
        || Number(this.state.dicembreF1) <= 0
        || Number(this.state.dicembreF2) <= 0
        || Number(this.state.dicembreF3) <= 0
        || Number(this.state.dicembrePeak) <= 0
        || Number(this.state.dicembreOffPeak) <= 0
      )
        errori.push("Inserire Tutti i Valori Mensili per Tutte le Fasce");
    }


    let mess = this.state.errorValida;

    if (errori.length) {
      errori.forEach(function (entry) {
        mess.push({ msg: entry, tipo: "danger" });
      });
    }
    else
      mess.push({ msg: "Ok, i dati sono corretti", tipo: "info" });

    //console.log(this.state.errorValida)
  }

  componentWillUnmount() {
    const { actions: { leaveNewOffer } } = this.props;
    leaveNewOffer();
  }


  calcConsumoFornito() {
    var totConsumo = 0, totConsumoF1 = 0, totConsumoF2 = 0, totConsumoF3 = 0, totConsumoPeak = 0, totConsumoOffPeak = 0;
    if (this.state.inizio_forn && this.state.fine_forn) {
      let startIndex = this.state.labels.indexOf(this.state.inizio_forn);
      let stopIndex = this.state.labels.indexOf(this.state.fine_forn);
      if (startIndex >= 0 && stopIndex >= 0) {
        // loop su tutti i mesi anno della fornitura
        for (var i = startIndex; i < stopIndex; i++) {
          // estarzione mese
          let am = this.state.labels[i].split(" ");
          let mese = am[0].toLowerCase();
          // sommo i valori di Fascia F1, F2, F3
          totConsumo += Number(this.state[mese + "F1"]) + Number(this.state[mese + "F2"]) + Number(this.state[mese + "F3"]);
          totConsumoF1 += Number(this.state[mese + "F1"]);
          totConsumoF2 += Number(this.state[mese + "F2"]);
          totConsumoF3 += Number(this.state[mese + "F3"]);
          totConsumoPeak += Number(this.state[mese + "Peak"]);
          totConsumoOffPeak += Number(this.state[mese + "OffPeak"]);
          //console.log(mese);
          //console.log(this.state[mese + "OffPeak"]);
        }
      }


      // console.log(this.state["inizio_forn"]);


    }
    return {
      totConsumo: totConsumo,
      totConsumoF1: totConsumoF1,
      totConsumoF2: totConsumoF2,
      totConsumoF3: totConsumoF3,
      totConsumoPeak: totConsumoPeak,
      totConsumoOffPeak: totConsumoOffPeak
    };
  }

  calcMesiFornitura() {
    var nMesi = 0;
    if (this.state.inizio_forn && this.state.fine_forn) {
      nMesi = monthDiff(meseAnno2Date(this.state.inizio_forn), meseAnno2Date(this.state.fine_forn));
    }
    return nMesi;
  }



  constructor(props) {
    super(props);
    this.state = {
      errorValida: [],
      infoOffer: [],
      data_validita: "",
      ore_validita: "",
      gennaioF1: "",
      gennaioF2: "",
      gennaioF3: "",
      febbraioF1: "",
      febbraioF2: "",
      febbraioF3: "",
      gennaioPeak: "",
      gennaioOffPeak: "",
      febbraioPeak: "",
      febbraioOffPeak: "",
      marzoF1: "",
      marzoF2: "",
      marzoF3: "",
      marzoPeak: "",
      marzoOffPeak: "",
      maggioF1: "",
      maggioF2: "",
      maggioF3: "",
      maggioPeak: "",
      maggioOffPeak: "",
      aprileF1: "",
      aprileF2: "",
      aprileF3: "",
      aprilePeak: "",
      aprileOffPeak: "",
      giugnoF1: "",
      giugnoF2: "",
      giugnoF3: "",
      giugnoOffPeak: "",
      giugnoPeak: "",
      luglioF1: "",
      luglioF2: "",
      luglioF3: "",
      luglioPeak: "",
      luglioOffPeak: "",
      agostoF1: "",
      agostoF2: "",
      agostoF3: "",
      agostoOffPeak: "",
      agostoPeak: "",
      settembreF1: "",
      settembreF2: "",
      settembreF3: "",
      settembreOffPeak: "",
      settembrePeak: "",
      ottobreF1: "",
      ottobreF2: "",
      ottobreF3: "",
      ottobrePeak: "",
      ottobreOffPeak: "",
      novembreF1: "",
      novembreF2: "",
      novembreF3: "",
      novembrePeak: "",
      novembreOffPeak: "",
      dicembreF1: "",
      dicembreF2: "",
      dicembreF3: "",
      dicembrePeak: "",
      dicembreOffPeak: "",
      tipoConsumi: "Mensili",
      cliente: "",
      indirizzo: "",
      localita: "",
      data: "",
      feeEco: 0,
      feeIntermediario: 0,
      consumoAnnuoF1: 0,
      consumoAnnuoF2: 0,
      consumoAnnuoF3: 0,
      consumoAnnuoOP: 0,
      consumoAnnuoPL: 0,
      fixMargineF1: 0.0,
      fixMargineF2: 0.0,
      fixMargineF3: 0.0,
      fixMarginePL: 0.0,
      fixMargineOP: 0.0,
      punMargineF1: 0.0,
      punMargineF2: 0.0,
      punMargineF3: 0.0,
      greenMargine: 0.25,
      fine_forn: "",
      inizio_forn: "",
      tipoSbilanciamento: "",
      verificaModalIsOpen: false,
      offerteModalIsOpen: false,
      ClientiModalIsOpen: false,
      labels: [],
      ore_F1: [],
      ore_F2: [],
      ore_F3: [],
      ore_OP: [],
      ore_PL: [],
      ore_TOT: [],
      //inizio_forn_select: 0,
      //checked: 0,
      radioScad: '',
      radioForn: 0,
      offerList: [],
      offerteGrid: [],
      addClient: []
      /* ,
      Verifica: {
        fixMargineF1: 0.0,
        punMargineF1: 0.0,
      } */
    };
    //this.handleChange = this.handleChange.bind(this);
    this.offerList = this.offerList.bind(this)
    this.onClickList = this.onClickList.bind(this)
    this.ClientList = this.ClientList.bind(this)
    this.onClickClient = this.onClickClient.bind(this)
    this.onClickClientDelet = this.onClickClientDelet.bind(this)
    this.onClickLodaClient = this.onClickLodaClient.bind(this)
  }

  /* handleInizioForn = (event) => {
    //setState({fine_forn: e.target.value})
    this.setState({ inizio_forn: event.target.value });
    console.log(this.props);
    this.calcFineForn(event.target.value);
  }; */

  handleRadioForn(inizio, fornradio) {
    this.setState({ radioForn: fornradio });
    this.calcFineForn(inizio, fornradio);
  }

  handleInizioForn(inizio, fornradio) {
    this.setState({ inizio_forn: inizio });
    this.calcFineForn(inizio, fornradio);
  }

  calcFineForn(inizio, fornradio) {
    if (fornradio == 6 || fornradio == 12 || fornradio == 24) {
      let newIndex = this.state.labels.indexOf(inizio) + fornradio - 1;
      newIndex = Math.min(this.state.labels.length - 1, newIndex)
      this.setState({ fine_forn: this.state.labels[newIndex] });
    }
    else if (fornradio == 100) {
      let am = inizio.split(" ");
      let newIndex = this.state.labels.indexOf("dicembre" + " " + am[1]);
      newIndex = newIndex === -1 ? this.state.labels.length - 1 : newIndex;
      this.setState({ fine_forn: this.state.labels[newIndex] });
    }

  }

  handleRadioScad(day, value) {
    let time = new Date();
    let dayy;
    if (day !== 0 && day !== 1 && day !== 2 && day !== 3) {
      dayy = 0;
    } else {
      dayy = day;
      //if(this.state.radioScad===value)return;
    }
    //conole.log(day);
    time.setDate(time.getDate() + dayy);
    this.setState({
      data_validita: moment(time).format("DD/MM/YYYY"),
      radioScad: value
    });
  }

  async offerList(value) {
    this.setState({ offerteModalIsOpen: true })
    await offer.getOfferList(value).then((res) => this.setState({ offerList: res.offerte, offerteGrid: res.offerte }))
    console.log('eccoceì');
    console.log(this.state.offerList)

    this.setState({
      offerteGrid: {
        data_creazione: this.state.offerList.map(function (obj) { return obj.data_creazione }),
        cliente: this.state.offerList.map(function (obj) { return obj.data_creazione }),
        fine_forn: this.state.offerList.map(function (obj) { return obj.fine_forn }),
        inizio_forn: this.state.offerList.map(function (obj) { return obj.inizio_forn }),
        nomeOfferta: this.state.offerList.map(function (obj) { return obj.nomeOfferta })
      }
    });
    console.log(this.state.offerteGrid)
  }


  async ClientList(value) {
    this.setState({ ClientiModalIsOpen: true })
    await offer.getOfferList(value).then((res) => this.setState({ offerList: res.offerte }))
  }

  onClickList(data) {
    let click = confirm("Attenzione, i dati della pagina corrente saranno sostiuiti con l’offert scelta");
    if (click == true) {
      this.setState({
        cliente: data.cliente,
        indirizzo: data.indirizzo,
        localita: data.localita,
        ore_validita: data.ore_validita,
        gennaioF1: data.genF1,
        gennaioF2: data.genF2,
        gennaioF3: data.genF3,
        gennaioPeak: data.genOP,
        gennaioOffPeak: data.genPL,
        febbraioF1: data.febF1,
        febbraioF2: data.febF2,
        febbraioF3: data.febF3,
        febbraioPeak: data.febOP,
        febbraioOffPeak: data.febPL,
        marzoF1: data.marF1,
        marzoF2: data.marF2,
        marzoF3: data.marF3,
        marzoPeak: data.marOP,
        marzoOffPeak: data.marPL,
        aprileF3: data.aprF3,
        aprileF2: data.aprF2,
        aprileF1: data.aprF3,
        aprilePeak: data.aprOP,
        aprileOffPeak: data.aprPL,
        maggioF1: data.magF1,
        maggioF2: data.magF2,
        maggioF3: data.magF3,
        maggioPeak: data.magOP,
        maggioOffPeak: data.magPL,
        giugnoF1: data.giuF1,
        giugnoF2: data.magF2,
        giugnoF3: data.magF3,
        giugnoPeak: data.magOP,
        giugnoOffPeak: data.magPL,
        luglioF1: data.lugF1,
        luglioF2: data.lugF2,
        luglioF3: data.lugF3,
        luglioPeak: data.lugOP,
        luglioOffPeak: data.lugPL,
        agostoF1: data.agoF1,
        agostoF2: data.agoF2,
        agostoF3: data.agoF3,
        agostoPeak: data.agoOP,
        agostoOffPeak: data.agoPL,
        settembreF1: data.setF1,
        settembreF2: data.setF2,
        settembreF3: data.setF3,
        settembrePeak: data.setOP,
        settembreOffPeak: data.setPL,
        ottobreF1: data.ottF1,
        ottobreF2: data.ottF2,
        ottobreF3: data.ottF3,
        ottobrePeak: data.ottOP,
        ottobreOffPeak: data.ottPL,
        novembreF1: data.novF1,
        novembreF2: data.novF2,
        novembreF3: data.novF3,
        novembrePeak: data.novOP,
        novembreOffPeak: data.novPL,
        dicembreF1: data.dicF1,
        dicembreF2: data.decF2,
        dicembreF3: data.dicF3,
        dicembrePeak: data.dicOP,
        dicembreOffPeak: data.dicPL,
        feeEco: data.feeEco,
        feeIntermediario: data.feeIntermediario,
        tipoConsumi: data.tipoConsumi,
        consumoAnnuoF1: data.consumoAnnuoF1,
        consumoAnnuoF2: data.consumoAnnuoF2,
        consumoAnnuoF3: data.consumoAnnuoF3,
        consumoAnnuoOP: data.consumoAnnuoOP,
        consumoAnnuoPL: data.consumoAnnuoPL,
        fine_forn: data.fine_forn,
        inizio_forn: data.inizio_forn,
        offerSearch: '',
        tipoSbilanciamento: data.tipoSbilanciamento,
        offerteModalIsOpen: false,
      })
    } else {
      null
    }
  }

  onClickClient(data) {
    let addClient = this.state.addClient
    addClient.push(data)
    this.setState({ addClient: addClient }, () => this.forceUpdate())

  }

  onClickClientDelet(index) {
    let addClient = this.state.addClient
    addClient.splice(index, 1)
    this.setState({ addClient: addClient }, () => this.forceUpdate())
  }

  findClient(value, index) {
    let find = this.state.addClient.find((val) => val === value)
    if (!find) {
      return (
        <button
          className="btn btn-primary"
          onClick={() => this.onClickClient(value, index)}
        >
          chiose
        </button>
      )
    }
  }

  onClickLodaClient(data) {
    console.log(data)
    let click = confirm("Attenzione, i dati della pagina corrente saranno sostiuiti con l’offert scelta");
    if (click == true) {
      this.setState({
        cliente: data.cliente,
        ClientiModalIsOpen: false,
        addClient: [],
      })
    }

  }

  render() {
    let INIZIO_FORN = this.state.labels.map((value, index) => {
      return (
        <option key={index}>{value}</option>
      )
    })
    let FINE_FORN = INIZIO_FORN

    let CONSUMO_FORNITO = this.calcConsumoFornito()
    let DECORRENZA = isNaN(meseAnno2Date(this.state.inizio_forn)) ? '' : moment(meseAnno2Date(this.state.inizio_forn)).format("DD/MM/YYYY")
    let MESI_FORNITURA = this.calcMesiFornitura()


    let quotazioni = this.state.infoOffer[0]
    let F1TOT = Number(this.state.gennaioF1) + Number(this.state.febbraioF1) + Number(this.state.marzoF1) + Number(this.state.aprileF1) + Number(this.state.maggioF1) + Number(this.state.giugnoF1) + Number(this.state.luglioF1) + Number(this.state.agostoF1) + Number(this.state.settembreF1) + Number(this.state.ottobreF1) + Number(this.state.novembreF1) + Number(this.state.dicembreF1)
    let F2TOT = Number(this.state.gennaioF2) + Number(this.state.febbraioF2) + Number(this.state.marzoF2) + Number(this.state.aprileF2) + Number(this.state.maggioF2) + Number(this.state.giugnoF2) + Number(this.state.luglioF2) + Number(this.state.agostoF2) + Number(this.state.settembreF2) + Number(this.state.ottobreF2) + Number(this.state.novembreF2) + Number(this.state.dicembreF2)
    let F3TOT = Number(this.state.gennaioF3) + Number(this.state.febbraioF3) + Number(this.state.marzoF3) + Number(this.state.aprileF3) + Number(this.state.maggioF3) + Number(this.state.giugnoF3) + Number(this.state.luglioF3) + Number(this.state.agostoF3) + Number(this.state.settembreF3) + Number(this.state.ottobreF3) + Number(this.state.novembreF3) + Number(this.state.dicembreF3)
    let F3PEAK = Number(this.state.gennaioPeak) + Number(this.state.febbraioPeak) + Number(this.state.marzoPeak) + Number(this.state.aprilePeak) + Number(this.state.maggioPeak) + Number(this.state.giugnoPeak) + Number(this.state.luglioPeak) + Number(this.state.agostoPeak) + Number(this.state.settembrePeak) + Number(this.state.ottobrePeak) + Number(this.state.novembrePeak) + Number(this.state.dicembrePeak)
    let F3OFFPEAK = Number(this.state.gennaioOffPeak) + Number(this.state.febbraioOffPeak) + Number(this.state.marzoOffPeak) + Number(this.state.aprileOffPeak) + Number(this.state.maggioOffPeak) + Number(this.state.giugnoOffPeak) + Number(this.state.luglioOffPeak) + Number(this.state.agostoOffPeak) + Number(this.state.settembreOffPeak) + Number(this.state.ottobreOffPeak) + Number(this.state.novembreOffPeak) + Number(this.state.dicembreOffPeak)


    let errorValida = this.state.errorValida.map((value, index) => {
      //return (<li key={index}>Insert: {value}</li>)
      return (<Alert
        type={value.tipo}>
        <strong>
          {value.msg}
        </strong>
        {/* This alert needs your attention, but it's not super important. */}
      </Alert>)
    })

    let vofferList = this.state.offerList.map((value, index) => {
      return (
        <TableRow key={index}>
          <TableCol>{index + 1}</TableCol>
          <TableCol>{value.cliente}</TableCol>
          <TableCol>{value.nomeOfferta}</TableCol>
          <TableCol>{value.inizio_forn}-{value.fine_forn}</TableCol>
          <TableCol>{value.data_creazione}</TableCol>
          <TableCol><button
            className="btn btn-primary" type="button"
            onClick={() => this.onClickList(value)}><i className="fa fa-upload"></i></button></TableCol>

        </TableRow>
      )
    })


    let ClientList = this.state.offerList.map((value, index) => {
      return (
        <li className="listOffer" key={index}>
          <span>{index + 1}</span><span>{value.cliente}</span><span>{value.nomeOfferta}</span><span>{value.inizio_forn}-{value.fine_forn}</span><span>{value.data_creazione}</span><span
            style={{ width: "67px" }}>
            {this.findClient(value, index)}
          </span>
        </li>
      )
    })
    let ClientListAdd = this.state.addClient.map((value, index) => {
      return (
        <li className="listOffer" key={index}>
          <span>{index + 1}</span><span>{value.cliente}</span><span>{value.nomeOfferta}</span><span><button
            className="btn btn-danger"
            onClick={() => this.onClickClientDelet(index)}>Delete</button></span>
        </li>
      )
    })

    return (
      <div>
        {/*-----------------------------------*/}
        <Modal
          ariaHideApp={false}
          isOpen={this.state.verificaModalIsOpen}
          onRequestClose={() => this.setState({ verificaModalIsOpen: false, errorValida: [] })}
          style={verificaStyles}
        >
          <div className="modal-footer">
            <button style={{ background: "RGB(220, 230, 241)", border: "none" }} onClick={() => this.setState({ verificaModalIsOpen: false, errorValida: [] })}>X</button>
          </div>
          {this.state.errorValida !== [] ? (
            <ul className="errorValida">{errorValida}</ul>) : null}
        </Modal>
        {/*-----------------------------------*/}
        <Modal
          ariaHideApp={false}
          isOpen={this.state.offerteModalIsOpen}
          onRequestClose={() => this.setState({ offerteModalIsOpen: false })}
          style={offerteStyles}
        >
          <div className="modal-footer">
            <button style={{ background: "RGB(220, 230, 241)", border: "none" }} onClick={() => this.setState({ offerteModalIsOpen: false })}>X</button>
          </div>

          <div className="textSearch">
            <input type="text" className="form-control" placeholder="Inserire testo ricerca"
              value={this.state.offerSearch}
              onChange={(e) => this.setState({ offerSearch: e.target.value })} />
            <button onClick={() => this.offerList(this.state.offerSearch)} className="btn btn-outline-secondary"
              type="button">Search <i className="fas fa-search"> </i></button>
          </div>

          <Table>
            <TableHeader>
              {
                headersOfferte.map(
                  (header, headerIdx) => {
                    return (
                      <TableCol key={headerIdx}>
                        {header}
                      </TableCol>
                    );
                  }
                )
              }
            </TableHeader>
            <TableBody>
              {vofferList}
            </TableBody>
          </Table>


        </Modal>
        {/*-----------------------------------*/}
        <Modal
          ariaHideApp={false}
          isOpen={this.state.ClientiModalIsOpen}
          onRequestClose={() => this.setState({ ClientiModalIsOpen: false, addClient: [] })}
          style={offerteStyles}
        >
          <button className="btn btn-danger" onClick={() => this.setState({ ClientiModalIsOpen: false, addClient: [] })}><i
            className="fas fa-times"></i></button>
          <br />
          <div className="textSearch">
            <div className="inputDiv">
              <input placeholder="write the name offer"
                value={this.state.offerSearch}
                onChange={(e) => this.setState({ offerSearch: e.target.value })} />
              <button onClick={() => this.onClickLodaClient(this.state.addClient[0])} className="btn  btn-success"
                type="button">Load
              </button>
            </div>
            <br />
            <div className="row col-md-12">
              <div className='col-md-6'>
                <button onClick={() => this.offerList(this.state.offerSearch)} className="btn btn-outline-secondary"
                  type="button">Search <i className="fas fa-search"> </i></button>
              </div>
              <div className='col-md-6 text-right'>
                <label>Totali consumi
                  <input />
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-12 row">
            <ul className="datagrit col-md-8">
              <li style={{ fontSize: 20 }}>
                <span>#</span><span>Cliente </span>Offerta<span>Fornitura</span><span>Creazione</span><span> </span>
              </li>
              {ClientList}
            </ul>
            <ul className="datagrit col-md-4">
              <li style={{ fontSize: 20 }}>
                <span>#</span><span>Cliente </span><span>Offerta</span><span> </span>
              </li>
              {ClientListAdd}
            </ul>
          </div>
        </Modal>
        {/*-----------------------------------*/}
        <AnimatedView>
          {quotazioni === undefined ? (
            <div>Loading... <br />if the loading takes more than 15 seconds, restart the page</div>
          ) : (

              <div className="container-fluid">

                <ul className="list-inline">
                  <li className="col-md-3 text-left">quotazioni aggiornate al: {this.state.data.q_data_prezzi}</li>
                  <li className="col-md-offset-1 col-md-2">KAM: <span className="heade_bg"> {quotazioni.kam}</span></li>
                  <li className="col-md-offset-1 col-md-2">Offerta: <span className="heade_bg"> {quotazioni.nomeOfferta}</span></li>
                </ul>
                <br />
                <div className="row col-12">
                  <div className="col-md-9 text-center button_top">
                    <button onClick={() => {
                      this.Verifica();
                      this.setState({ verificaModalIsOpen: true })
                    }} className="col  btn btn-primary" type="button"><i className="fas fa-thumbs-up"></i>Verifica
                  </button>

                    <button className="col  btn btn-success" type="button" ><i className="fas fa-check"></i>Parcheggia
                </button>
                    {/* <a
                  className="btn btn-danger"
                  data-toggle="modal"
                  href="#modalCtrlNewOffer">
                  Alert !
                </a>
 */}
                    <button className="col  btn btn-danger" type="button"><i className="fas fa-caret-right"></i>Conferma
                </button>
                    <button className="col  btn btn-danger" type="button"><i className="fas fa-caret-right"></i>Conferma
                      Calcolo Posticipato
                </button>
                    <button onClick={() => {
                      this.ClientList('')
                    }} className="col btn btn-success" type="button"><i className="fas fa-gift"></i>Clienti
                  </button>
                    <button onClick={() => {
                      this.offerList('')
                    }} className="col  btn btn-success" type="button"><i className="fas fa-newspaper"></i>Offerte
                  </button>
                  </div>
                </div>
                <div className="Riepilogo row">
                  <p className="col-md-12" style={{ color: "#366092", fontWeight: "bold", marginTop: '10px' }}>Riepilogo</p>
                  <div className="col-md-3 Riepilogo_body">
                    <span className="col-md-12 row ">
                      <p className="col-md-6  col-xs-12">Consumo fornito kWh</p>
                      <div className="col-md-6  col-xs-12 text-right"
                        style={{ background: "RGB(220, 230, 241)", border: "none", padding: 0 }}>{(CONSUMO_FORNITO.totConsumo).formatInt()}</div>
                    </span>
                    <span className="col-md-12 row ">
                      <p className="col-md-6  col-xs-12">BLD Mkt €/MWh</p>
                      <input className="col-md-6 col-xs-12 text-center" value="45,06"
                        style={{ background: "RGB(242, 220, 219)", border: "none" }} />
                    </span>
                    <span className="col-md-12 row ">
                      <p className="col-md-6  col-xs-12">BLD Profilato €/MWh</p>
                      <input className="col-md-6  col-xs-12 text-center" value="46,45"
                        style={{ background: "RGB(242, 220, 219)", border: "none" }} />
                    </span>
                    <span className="col-md-12 row ">
                      <p className="col-md-6  col-xs-12">Prezzo Medio €/MWh</p>
                      <input className="col-md-6  col-xs-12 text-center" value="48,75"
                        style={{ background: "RGB(220, 230, 241)", border: "none" }} />
                    </span>
                  </div>
                  <div className="col-md-3 Riepilogo_body">
                    <span className="col-md-12 row">
                      <p className="col-md-6  col-xs-12">Costo Profilo  €/MWh</p>
                      <input className="col-md-6  col-xs-12 text-center" value="1,39"
                        style={{ background: "RGB(242, 220, 219)", border: "none" }} />
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6 col-xs-12">Margine €/MWh</p>
                      <div className="col-md-6  col-xs-12 text-center"
                        style={{ background: "RGB(220, 230, 241)", border: "none" }}>0000</div>
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6  col-xs-12">Margine Vendita €</p>
                      <div className="col-md-6  col-xs-12 text-center"
                        style={{ background: "RGB(220, 230, 241)", border: "none" }}>000</div>
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6  col-xs-12">Margine Vendita Verde €</p>
                      <div className="col-md-6  col-xs-12 text-center"
                        style={{ background: "RGB(216, 228, 188)", border: "none" }}>000</div>
                    </span>
                  </div>
                  <div className="col-md-3 Riepilogo_body">
                    <span className="col-md-12 row">
                      <p className="col-md-6  col-xs-12">Decorrenza</p>
                      <input className="col-md-6  col-xs-12 text-left" value={DECORRENZA}
                        style={{ color: "#366092", fontWeight: "bold", background: "RGB(242, 220, 219)", border: "none" }} />
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6 col-xs-12">L'offerta scade alle ore</p>
                      <div className="col-md-6  col-xs-12 text-left"
                        style={{ color: "#366092", fontWeight: "bold", background: "RGB(220, 230, 241)", border: "none" }}>{this.state.ore_validita}</div>
                    </span>

                  </div>

                  <div className="col-md-3 Riepilogo_body">
                    <span className="col-md-12 row">
                      <p className="col-md-6  col-xs-12">Mesi fornitura</p>
                      <input className="col-md-6  col-xs-12 text-left" value={MESI_FORNITURA}
                        style={{ color: "#366092", fontWeight: "bold", background: "RGB(242, 220, 219)", border: "none" }} />
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6 col-xs-12">del</p>
                      <div className="col-md-6  col-xs-12 text-left"
                        style={{ color: "#366092", fontWeight: "bold", background: "RGB(220, 230, 241)", border: "none" }}>{this.state.data_validita}</div>
                    </span>

                  </div>

                </div>
                <div className="anag_block row col-12">
                  <p className="col-md-12"
                    style={{ color: "#366092", marginTop: '10px', fontStyle: "italic", fontWeight: "bold" }}>Anagrafica
                Cliente/Gruppo</p>
                  <div className="row container-fluid">
                    <p style={{ color: "#333399", fontWeight: "bold" }} className="col-md-1 text-center">Cliente</p>
                    <input value={this.state.cliente} onChange={(e) => this.setState({ cliente: e.target.value })}
                      className="col-md-10 col-xs-12" style={{
                        background: "#dce6f1",
                        border: "none"
                      }} />
                  </div>
                  <div className="row container-fluid">
                    <p style={{ color: "#333399", fontWeight: "bold" }} className="col-md-1 text-center">Indirizzo</p>
                    <input value={this.state.indirizzo} onChange={(e) => this.setState({ indirizzo: e.target.value })}
                      className="col-md-4 col-xs-12" style={{
                        background: "#dce6f1",
                        border: "none"
                      }} />
                    <p style={{ color: "#333399", fontWeight: "bold" }} className="col-md-2 text-center">Cap e Località</p>
                    <input value={this.state.localita} onChange={(e) => this.setState({ localita: e.target.value })}
                      className="col-md-4 col-xs-12" style={{
                        background: "#dce6f1",
                        border: "none"
                      }} />
                  </div>
                  <div className="row container-fluid">
                    <p className="col-md-2" style={{
                      color: "#333399",
                      fontWeight: "bold",
                    }}>Periodo di fornitura</p>
                    <div className="col-md-1">
                      <input onClick={() => this.handleRadioForn(this.state.inizio_forn, 6)} name="radioForn" type="radio" checked={this.state.radioForn === 6} />
                      <label>6 mesi</label>
                    </div>
                    <div className="col-md-1">
                      <input onClick={() => this.handleRadioForn(this.state.inizio_forn, 12)} name="radioForn" type="radio" checked={this.state.radioForn === 12} />
                      <label>12 mesi</label>
                    </div>
                    <div className="col-md-1">
                      <input onClick={() => this.handleRadioForn(this.state.inizio_forn, 24)} name="radioForn" type="radio" checked={this.state.radioForn === 24} />
                      <label>24</label>
                    </div>
                    <div className="col-md-1">
                      <input onClick={() => this.handleRadioForn(this.state.inizio_forn, 100)} name="radioForn" type="radio" checked={this.state.radioForn === 100} />
                      <label>fine anno</label>
                    </div>

                    <p className="col-md-2" style={{
                      color: "#333399",
                      fontWeight: "bold",
                      fontSize: "13px"
                    }}>Scadenza dell’offerta</p>
                    <div className="col-md-1">
                      <input name="radioScad" type="radio" checked={this.state.radioScad === "oggi"} onClick={() => {
                        this.handleRadioScad(0, "oggi")
                      }} />
                      <label>oggi</label>
                    </div>
                    <div className="col-md-1">
                      <input name="radioScad" type="radio" checked={this.state.radioScad === "domani"} onClick={() => {
                        this.handleRadioScad(1, "domani")
                      }} />
                      <label>domani</label>
                    </div>
                    <div className="col-md-1">
                      <input name="radioScad" type="radio" checked={this.state.radioScad === "2 gg"} onClick={() => {
                        this.handleRadioScad(2, "2 gg")
                      }} />
                      <label>2 gg</label>
                    </div>
                    <div className="col-md-1">
                      <input name="radioScad" type="radio" checked={this.state.radioScad === "3 gg"} onClick={() => {
                        this.handleRadioScad(3, "3 gg")
                      }} />
                      <label>3 gg</label>
                    </div>
                  </div>
                  <div className="row container-fluid">
                    <p className="col-md-1 text-center" style={{
                      color: "#333399",
                      fontWeight: "bold",
                    }}>
                      Inizio Fornitura
                </p>
                    <span className="col-md-2" style={{ color: "#333399" }}>
                      <select value={this.state.inizio_forn}
                        onChange={(e) => this.handleInizioForn(e.target.value, this.state.radioForn)}  >
                        {INIZIO_FORN}
                      </select>
                    </span>
                    <p className="col-md-1 text-center" style={{
                      color: "#333399",
                      fontWeight: "bold",
                    }}>
                      Fine Fornitura
                </p>
                    <span className="col-md-2" style={{ color: "#333399" }}>

                      <select value={this.state.fine_forn} onChange={(e) => this.setState({ radioForn: 0, fine_forn: e.target.value })} >
                        {FINE_FORN}
                      </select>
                    </span>
                    <p className="col-md-2 text-center" style={{
                      color: "#333399",
                      fontWeight: "bold",
                    }}>
                      Validità Offerta
                </p>
                    <div className='col-md-2'><DatePicker
                      className="time"
                      selected={moment(this.state.data_validita, "DD/MM/YYYY")}
                      locale="it"
                      onChange={(e) =>
                        this.setState({ radioScad: 0, data_validita: e.format("DD/MM/YYYY") })
                      }
                      dateFormat="DD/MM/YYYY"
                    /></div>
                    <p className="col-md-1 text-center" style={{
                      color: "#333399",
                      fontWeight: "bold",
                    }}>
                      Entro ore:
                </p>
                    <div className="col-md-1">
                      <select value={this.state.ore_validita}
                        onChange={(e) => this.setState({ ore_validita: e.target.value })}>
                        <option>01:00</option>
                        <option>02:00</option>
                        <option>03:00</option>
                        <option>04:00</option>
                        <option>05:00</option>
                        <option>06:00</option>
                        <option>07:00</option>
                        <option>08:00</option>
                        <option>09:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                        <option>20:00</option>
                        <option>21:00</option>
                        <option>22:00</option>
                        <option>23:00</option>
                        <option>24:00</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="Fornitura row">
                  <p className="col-md-12"
                    style={{ color: "#366092", marginTop: '10px', fontStyle: "italic", fontWeight: "bold" }}>Dati
                Fornitura</p>
                  <span className="col-md-12 row">
                    <p className="col-md-1 col-md-offset-1" style={{ color: "#333399", fontWeight: "bold" }}>Consumi</p>
                    <div className="col-md-1">
                      <input value="Mensili" onClick={(e) => this.setState({ tipoConsumi: e.target.value })} name="Consumi"
                        type="radio"
                        checked={this.state.tipoConsumi === 'Mensili'} />
                      <label>M</label>
                    </div>
                    <div className="col-md-1">
                      <input value="Annui" onClick={(e) => this.setState({ tipoConsumi: e.target.value })} name="Consumi"
                        type="radio"
                        checked={this.state.tipoConsumi === 'Annui'} />
                      <label>A</label>
                    </div>
                  </span>
                  <span className="col-md-12 row block_mobile">
                    <p className="col-md-1 col-md-offset-1" style={{ color: "#333399" }}>[kWh]</p>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>F1</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>F2</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>F3</div>
                    <div className="col-md-1 text-center">TOT</div>
                    <div className="col-md-1 col-md-offset-1 text-center"
                      style={{ background: "#4c7fbc", color: "#fff" }}>Peak</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>OffPeak</div>
                    <div className="col-md-1 text-center">TOT</div>
                  </span>
                  <div style={this.state.tipoConsumi === "Annui" ? { display: "none" } : null}>

                    <span className="col-md-12 row input_anag">
                      <p className="col-md-1 col-md-offset-1">gennaio</p>
                      <label className="mobile_text">F1</label>
                      <input value={Number(this.state.gennaioF1).formatInt()}
                        onChange={(e) => this.setState({ gennaioF1: e.target.value.replace(/\D/, '') })}
                        onFocus={this.handleFocus}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F2</label>
                      <input value={Number(this.state.gennaioF2).formatInt()} onChange={(e) => this.setState({ gennaioF2: e.target.value.replace(/\D/, '') })}
                        onFocus={this.handleFocus}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F3</label>
                      <input value={Number(this.state.gennaioF3).formatInt()} onChange={(e) => this.setState({ gennaioF3: e.target.value.replace(/\D/, '') })}
                        onFocus={this.handleFocus}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{(Number(this.state.gennaioF1) + Number(this.state.gennaioF2) + Number(this.state.gennaioF3)).formatInt()}</div>
                      <label className="mobile_text">Peak</label>
                      <input value={Number(this.state.gennaioPeak).formatInt()} onChange={(e) => this.setState({ gennaioPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 col-md-offset-1 text-right" />
                      <label className="mobile_text">OffPeak</label>
                      <input value={Number(this.state.gennaioOffPeak).formatInt()}
                        onChange={(e) => this.setState({ gennaioOffPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{(Number(this.state.gennaioPeak) + Number(this.state.gennaioOffPeak)).formatInt()}</div>
                    </span>
                    <span className="col-md-12 row input_anag">
                      <p className="col-md-1 col-md-offset-1">febbraio</p>
                      <label className="mobile_text">F1</label>
                      <input value={this.state.febbraioF1} onChange={(e) => this.setState({ febbraioF1: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F2</label>
                      <input value={this.state.febbraioF2} onChange={(e) => this.setState({ febbraioF2: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F3</label>
                      <input value={this.state.febbraioF3} onChange={(e) => this.setState({ febbraioF3: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.febbraioF1) + Number(this.state.febbraioF2) + Number(this.state.febbraioF3)}</div>
                      <label className="mobile_text">Peak</label>
                      <input value={this.state.febbraioPeak} onChange={(e) => this.setState({ febbraioPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 col-md-offset-1 text-right" />
                      <label className="mobile_text">OffPeak</label>
                      <input value={this.state.febbraioOffPeak}
                        onChange={(e) => this.setState({ febbraioOffPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.febbraioPeak) + Number(this.state.febbraioOffPeak)}</div>
                    </span>
                    <span className="col-md-12 row input_anag">
                      <p className="col-md-1 col-md-offset-1">marzo</p>
                      <label className="mobile_text">F1</label>
                      <input value={this.state.marzoF1} onChange={(e) => this.setState({ marzoF1: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F2</label>
                      <input value={this.state.marzoF2} onChange={(e) => this.setState({ marzoF2: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F3</label>
                      <input value={this.state.marzoF3} onChange={(e) => this.setState({ marzoF3: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.marzoF1) + Number(this.state.marzoF2) + Number(this.state.marzoF3)}</div>
                      <label className="mobile_text">Peak</label>
                      <input value={this.state.marzoPeak} onChange={(e) => this.setState({ marzoPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 col-md-offset-1 text-right" />
                      <label className="mobile_text">OffPeak</label>
                      <input value={this.state.marzoOffPeak}
                        onChange={(e) => this.setState({ marzoOffPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.marzoPeak) + Number(this.state.marzoOffPeak)}</div>
                    </span>
                    <span className="col-md-12 row input_anag">
                      <p className="col-md-1 col-md-offset-1">aprile</p>
                      <label className="mobile_text">F1</label>
                      <input value={this.state.aprileF1} onChange={(e) => this.setState({ aprileF1: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F2</label>
                      <input value={this.state.aprileF2} onChange={(e) => this.setState({ aprileF2: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F3</label>
                      <input value={this.state.aprileF3} onChange={(e) => this.setState({ aprileF3: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.aprileF1) + Number(this.state.aprileF2) + Number(this.state.aprileF3)}</div>
                      <label className="mobile_text">Peak</label>
                      <input value={this.state.aprilePeak} onChange={(e) => this.setState({ aprilePeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 col-md-offset-1 text-right" />
                      <label className="mobile_text">OffPeak</label>
                      <input value={this.state.aprileOffPeak}
                        onChange={(e) => this.setState({ aprileOffPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.aprilePeak) + Number(this.state.aprileOffPeak)}</div>
                    </span>
                    <span className="col-md-12 row input_anag">
                      <p className="col-md-1 col-md-offset-1">maggio</p>
                      <label className="mobile_text">F1</label>
                      <input value={this.state.maggioF1} onChange={(e) => this.setState({ maggioF1: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F2</label>
                      <input value={this.state.maggioF2} onChange={(e) => this.setState({ maggioF2: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F3</label>
                      <input value={this.state.maggioF3} onChange={(e) => this.setState({ maggioF3: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.maggioF1) + Number(this.state.maggioF2) + Number(this.state.maggioF3)}</div>
                      <label className="mobile_text">Peak</label>
                      <input value={this.state.maggioPeak} onChange={(e) => this.setState({ maggioPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 col-md-offset-1 text-right" />
                      <label className="mobile_text">OffPeak</label>
                      <input value={this.state.maggioOffPeak}
                        onChange={(e) => this.setState({ maggioOffPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.maggioOffPeak) + Number(this.state.maggioPeak)}</div>
                    </span>
                    <span className="col-md-12 row input_anag">
                      <p className="col-md-1 col-md-offset-1">giugno</p>
                      <label className="mobile_text">F1</label>
                      <input value={this.state.giugnoF1} onChange={(e) => this.setState({ giugnoF1: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F2</label>
                      <input value={this.state.giugnoF2} onChange={(e) => this.setState({ giugnoF2: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F3</label>
                      <input value={this.state.giugnoF3} onChange={(e) => this.setState({ giugnoF3: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.giugnoF1) + Number(this.state.giugnoF2) + Number(this.state.giugnoF3)}</div>
                      <label className="mobile_text">Peak</label>
                      <input value={this.state.giugnoOffPeak}
                        onChange={(e) => this.setState({ giugnoOffPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 col-md-offset-1 text-right" />
                      <label className="mobile_text">OffPeak</label>
                      <input value={this.state.giugnoPeak} onChange={(e) => this.setState({ giugnoPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.giugnoOffPeak) + Number(this.state.giugnoPeak)}</div>
                    </span>
                    <span className="col-md-12 row input_anag">
                      <p className="col-md-1 col-md-offset-1">luglio</p>
                      <label className="mobile_text">F1</label>
                      <input value={this.state.luglioF1} onChange={(e) => this.setState({ luglioF1: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F2</label>
                      <input value={this.state.luglioF2} onChange={(e) => this.setState({ luglioF2: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F3</label>
                      <input value={this.state.luglioF3} onChange={(e) => this.setState({ luglioF3: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.luglioF1) + Number(this.state.luglioF2) + Number(this.state.luglioF3)}</div>
                      <label className="mobile_text">Peak</label>
                      <input value={this.state.luglioPeak} onChange={(e) => this.setState({ luglioPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 col-md-offset-1 text-right" />
                      <label className="mobile_text">OffPeak</label>
                      <input value={this.state.luglioOffPeak}
                        onChange={(e) => this.setState({ luglioOffPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.luglioPeak) + Number(this.state.luglioOffPeak)}</div>
                    </span>
                    <span className="col-md-12 row input_anag">
                      <p className="col-md-1 col-md-offset-1">agosto</p>
                      <label className="mobile_text">F1</label>
                      <input value={this.state.agostoF1} onChange={(e) => this.setState({ agostoF1: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F2</label>
                      <input value={this.state.agostoF2} onChange={(e) => this.setState({ agostoF2: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F3</label>
                      <input value={this.state.agostoF3} onChange={(e) => this.setState({ agostoF3: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.agostoF1) + Number(this.state.agostoF2) + Number(this.state.agostoF3)}</div>
                      <label className="mobile_text">Peak</label>
                      <input value={this.state.agostoPeak} onChange={(e) => this.setState({ agostoPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 col-md-offset-1 text-right" />
                      <label className="mobile_text">OffPeak</label>
                      <input value={this.state.agostoOffPeak}
                        onChange={(e) => this.setState({ agostoOffPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.agostoPeak) + Number(this.state.agostoOffPeak)}</div>
                    </span>
                    <span className="col-md-12 row input_anag">
                      <p className="col-md-1 col-md-offset-1">settembre</p>
                      <label className="mobile_text">F1</label>
                      <input value={this.state.settembreF1} onChange={(e) => this.setState({ settembreF1: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F2</label>
                      <input value={this.state.settembreF2} onChange={(e) => this.setState({ settembreF2: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F3</label>
                      <input value={this.state.settembreF3} onChange={(e) => this.setState({ settembreF3: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.settembreF1) + Number(this.state.settembreF2) + Number(this.state.settembreF3)}</div>
                      <label className="mobile_text">Peak</label>
                      <input value={this.state.settembrePeak}
                        onChange={(e) => this.setState({ settembrePeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 col-md-offset-1 text-right" />
                      <label className="mobile_text">OffPeak</label>
                      <input value={this.state.settembreOffPeak}
                        onChange={(e) => this.setState({ settembreOffPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.settembreOffPeak) + Number(this.state.settembrePeak)}</div>
                    </span>
                    <span className="col-md-12 row input_anag">
                      <p className="col-md-1 col-md-offset-1">ottobre</p>
                      <label className="mobile_text">F1</label>
                      <input value={this.state.ottobreF1} onChange={(e) => this.setState({ ottobreF1: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F2</label>
                      <input value={this.state.ottobreF2} onChange={(e) => this.setState({ ottobreF2: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F3</label>
                      <input value={this.state.ottobreF3} onChange={(e) => this.setState({ ottobreF3: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.ottobreF1) + Number(this.state.ottobreF2) + Number(this.state.ottobreF3)}</div>
                      <label className="mobile_text">Peak</label>
                      <input value={this.state.ottobrePeak} onChange={(e) => this.setState({ ottobrePeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 col-md-offset-1 text-right" />
                      <label className="mobile_text">OffPeak</label>
                      <input value={this.state.ottobreOffPeak}
                        onChange={(e) => this.setState({ ottobreOffPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.ottobrePeak) + Number(this.state.ottobreOffPeak)}</div>
                    </span>
                    <span className="col-md-12 row input_anag">
                      <p className="col-md-1 col-md-offset-1">novembre</p>
                      <label className="mobile_text">F1</label>
                      <input value={this.state.novembreF1} onChange={(e) => this.setState({ novembreF1: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F2</label>
                      <input value={this.state.novembreF2} onChange={(e) => this.setState({ novembreF2: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F3</label>
                      <input value={this.state.novembreF3} onChange={(e) => this.setState({ novembreF3: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.novembreF1) + Number(this.state.novembreF2) + Number(this.state.novembreF3)}</div>
                      <label className="mobile_text">Peak</label>
                      <input value={this.state.novembrePeak} onChange={(e) => this.setState({ novembrePeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 col-md-offset-1 text-right" />
                      <label className="mobile_text">OffPeak</label>
                      <input value={this.state.novembreOffPeak}
                        onChange={(e) => this.setState({ novembreOffPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.novembrePeak) + Number(this.state.novembreOffPeak)}</div>
                    </span>
                    <span className="col-md-12 row input_anag">
                      <p className="col-md-1 col-md-offset-1">dicembre</p>
                      <label className="mobile_text">F1</label>
                      <input value={this.state.dicembreF1} onChange={(e) => this.setState({ dicembreF1: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F2</label>
                      <input value={this.state.dicembreF2} onChange={(e) => this.setState({ dicembreF2: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">F3</label>
                      <input value={this.state.dicembreF3} onChange={(e) => this.setState({ dicembreF3: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.dicembreF1) + Number(this.state.dicembreF2) + Number(this.state.dicembreF3)}</div>
                      <label className="mobile_text">Peak</label>
                      <input value={this.state.dicembrePeak} onChange={(e) => this.setState({ dicembrePeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 col-md-offset-1 text-right" />
                      <label className="mobile_text">OffPeak</label>
                      <input value={this.state.dicembreOffPeak}
                        onChange={(e) => this.setState({ dicembreOffPeak: e.target.value.replace(/\D/, '') })}
                        className="col-md-1 text-right" />
                      <label className="mobile_text">TOT</label>
                      <div
                        className="col-md-1 text-right">{Number(this.state.dicembreOffPeak) + Number(this.state.dicembrePeak)}</div>
                    </span>
                  </div>
                  <span style={this.state.tipoConsumi === "Annui" ? { display: "none" } : null} className="col-md-12 row">
                    <p className="col-md-1 col-md-offset-1" style={{ color: "#333399", fontWeight: "bold" }}>TOT</p>
                    <label className="col-md-1 text-right" style={{ background: "#dce6f1", border: "none" }}>{F1TOT}</label>
                    <label className="col-md-1 text-right" style={{ background: "#dce6f1", border: "none" }}>{F2TOT}</label>
                    <label className="col-md-1 text-right" style={{ background: "#dce6f1", border: "none" }}>{F3TOT}</label>
                    <div className="col-md-1 text-right">{F3TOT + F1TOT + F2TOT}</div>
                    <label className="col-md-1 col-md-offset-1 text-right"
                      style={{ background: "#dce6f1", border: "none" }}>{F3PEAK}</label>
                    <label className="col-md-1 text-right"
                      style={{ background: "#dce6f1", border: "none" }}>{F3OFFPEAK}</label>
                    <div className="col-md-1 text-right">{F3PEAK + F3OFFPEAK}</div>
                  </span>
                  <div style={this.state.tipoConsumi === "Mensili" ? { display: "none" } : null}>
                    <span className="col-md-12 row input_anag">
                      <p className="col-md-2" style={{ color: "#333399", fontWeight: "bold" }}>Consumo Annuo</p>
                      <input className="col-md-1 text-right" value={this.state.consumoAnnuoF1}
                        onChange={(e) => this.setState({ consumoAnnuoF1: e.target.value })} />
                      <input className="col-md-1 text-right" value={this.state.consumoAnnuoF2}
                        onChange={(e) => this.setState({ consumoAnnuoF2: e.target.value })} />
                      <input className="col-md-1 text-right" value={this.state.consumoAnnuoF3}
                        onChange={(e) => this.setState({ consumoAnnuoF3: e.target.value })} />
                      <div className="col-md-1 text-right" style={{
                        color: "#333399",
                        fontWeight: "bold"
                      }}>{Number(this.state.consumoAnnuoF1) + Number(this.state.consumoAnnuoF2) + Number(this.state.consumoAnnuoF3)}</div>
                      <input className="col-md-1 col-md-offset-1 text-right"
                        value={this.state.consumoAnnuoPL}
                        onChange={(e) => this.setState({ consumoAnnuoPL: e.target.value })} />
                      <input className="col-md-1 text-right" value={this.state.consumoAnnuoOP}
                        onChange={(e) => this.setState({ consumoAnnuoOP: e.target.value })} />
                      <div className="col-md-2 text-right" style={{
                        color: "#333399",
                        fontWeight: "bold"
                      }}>{Number(this.state.consumoAnnuoPL) + Number(this.state.consumoAnnuoOP)}</div>
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-2" style={{ color: "#333399", fontWeight: "bold" }}>Profilo Cons.Annuo</p>
                      <div
                        className="col-md-1 text-right">{((Number(this.state.consumoAnnuoF1) / F1TOT) * 100).toFixed(1)}%</div>
                      <div
                        className="col-md-1 text-right">{((Number(this.state.consumoAnnuoF2) / F2TOT) * 100).toFixed(1)}%</div>
                      <div
                        className="col-md-1 text-right">{((Number(this.state.consumoAnnuoF3) / F3TOT) * 100).toFixed(1)}%</div>
                      <div
                        className="col-md-1 text-right">{(((Number(this.state.consumoAnnuoF1) + Number(this.state.consumoAnnuoF2) + Number(this.state.consumoAnnuoF3)) / (F1TOT + F2TOT + F3TOT)) * 100).toFixed(1)}%</div>
                      <div
                        className="col-md-1 col-md-offset-1 text-right">{((Number(this.state.consumoAnnuoPL) / F3PEAK) * 100).toFixed(1)}%</div>
                      <div
                        className="col-md-1 text-right">{((Number(this.state.consumoAnnuoOP) / F3OFFPEAK) * 100).toFixed(1)}%</div>
                      <div
                        className="col-md-1 text-right">{(((Number(this.state.consumoAnnuoOP) + Number(this.state.consumoAnnuoPL)) / (F3PEAK + F3OFFPEAK)) * 100).toFixed(1)}%</div>
                    </span>
                  </div>
                  <div>
                    <span className="col-md-12 row">
                      <p className="col-md-2" style={{ color: "#333399", fontWeight: "bold" }}>Сonsumo fornito</p>
                      <input className="col-md-1 text-right" value={(CONSUMO_FORNITO.totConsumoF1).formatInt()}
                        style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                      <input className="col-md-1 text-right" value={(CONSUMO_FORNITO.totConsumoF2).formatInt()}
                        style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                      <input className="col-md-1 text-right" value={(CONSUMO_FORNITO.totConsumoF3).formatInt()}
                        style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                      <div className="col-md-1 text-right" style={{ color: "#333399", fontWeight: "bold" }}>{(CONSUMO_FORNITO.totConsumoF1 + CONSUMO_FORNITO.totConsumoF2 + CONSUMO_FORNITO.totConsumoF3).formatInt()}</div>
                      <input className="col-md-1 col-md-offset-1 text-right" value={(CONSUMO_FORNITO.totConsumoPeak).formatInt()}
                        style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                      <input className="col-md-1 text-right" value={(CONSUMO_FORNITO.totConsumoOffPeak).formatInt()}
                        style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                      <div className="col-md-1 text-right" style={{ color: "#333399", fontWeight: "bold" }}>{(CONSUMO_FORNITO.totConsumoPeak + CONSUMO_FORNITO.totConsumoOffPeak).formatInt()}</div>
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-2" style={{ color: "#333399", fontWeight: "bold" }}>Profilo fornitura</p>
                      <div className="col-md-1 text-right" style={{ color: "#333399" }}>{(100 * CONSUMO_FORNITO.totConsumoF1 / (CONSUMO_FORNITO.totConsumoF1 + CONSUMO_FORNITO.totConsumoF2 + CONSUMO_FORNITO.totConsumoF3)).formatInt()}%</div>
                      <div className="col-md-1 text-right" style={{ color: "#333399" }}>{(100 * CONSUMO_FORNITO.totConsumoF2 / (CONSUMO_FORNITO.totConsumoF1 + CONSUMO_FORNITO.totConsumoF2 + CONSUMO_FORNITO.totConsumoF3)).formatInt()}%</div>
                      <div className="col-md-1 text-right" style={{ color: "#333399" }}>{(100 * CONSUMO_FORNITO.totConsumoF3 / (CONSUMO_FORNITO.totConsumoF1 + CONSUMO_FORNITO.totConsumoF2 + CONSUMO_FORNITO.totConsumoF3)).formatInt()}%</div>
                      <div className="col-md-1 text-right"> </div>
                      <div className="col-md-1 col-md-offset-1 text-right" style={{ color: "#333399" }}>{(100 * CONSUMO_FORNITO.totConsumoPeak / (CONSUMO_FORNITO.totConsumoPeak + CONSUMO_FORNITO.totConsumoOffPeak)).formatInt()}%</div>
                      <div className="col-md-1 text-right" style={{ color: "#333399" }}>{(100 * CONSUMO_FORNITO.totConsumoOffPeak / (CONSUMO_FORNITO.totConsumoPeak + CONSUMO_FORNITO.totConsumoOffPeak)).formatInt()}%</div>
                      <div className="col-md-1 text-right"> </div>
                      <div className="col-md-2  text-right"> </div>
                    </span>
                  </div>
                </div>
                <div className="Prezzo row">
                  <p className="col-md-12" style={{ color: "#366092", fontWeight: "bold", marginTop: '10px' }}>Prezzo
                FISSO</p>
                  <span className="col-md-12 row block_mobile">
                    <p className="col-md-1 col-md-offset-1"> </p>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>F1</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>F2</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>F3</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>Profilato</div>
                    <div className="col-md-1 col-md-offset-1 text-center"
                      style={{ background: "#4c7fbc", color: "#fff" }}>Peak</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>OffPeak</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>Profilato</div>
                  </span>
                  <span className="col-md-12 row">
                    <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold" }}>Sourcing €/MWh</p>
                    <label className="mobile_text">F1</label>
                    <input className="col-md-1 text-center" value="52,04"
                      style={{ color: "#333399", background: "#dce6f1", border: "none" }} />
                    <label className="mobile_text">F2</label>
                    <input className="col-md-1 text-center" value="59,92"
                      style={{ color: "#333399", background: "#dce6f1", border: "none" }} />
                    <label className="mobile_text">F3</label>
                    <input className="col-md-1 text-center" value="40,20"
                      style={{ color: "#333399", background: "#dce6f1", border: "none" }} />
                    <label className="mobile_text">Profilato</label>
                    <div className="col-md-1 text-center" style={{ color: "#333399", }}>46,46</div>
                    <label className="mobile_text">Peak</label>
                    <input className="col-md-1 col-md-offset-1 text-center" value="52,21"
                      style={{ color: "#333399", background: "#dce6f1", border: "none" }} />
                    <label className="mobile_text">OffPeak</label>
                    <input className="col-md-1 text-center" value="43,24"
                      style={{ color: "#333399", background: "#dce6f1", border: "none" }} />
                    <label className="mobile_text">Profilato</label>
                    <div className="col-md-1 text-center" style={{ color: "#333399", }}>46,43</div>
                  </span>
                  <span className="col-md-12 row">
                    <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold" }}>margine €/MWh</p>
                    <div className="col-md-1 text-center">{this.state.fixMargineF1}</div>
                    <div className="col-md-1 text-center">{this.state.fixMargineF2}</div>
                    <div className="col-md-1 text-center">{this.state.fixMargineF3}</div>
                    <div className="col-md-1 text-center">-</div>
                    <div className="col-md-1 col-md-offset-1 text-center">{this.state.fixMarginePL}</div>
                    <div className="col-md-1 text-center">{this.state.fixMargineOP}</div>
                    <div className="col-md-1 text-center">-</div>
                  </span>
                  <span className="col-md-12 row">
                    <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold" }}>Prezzo Finali €/MWh</p>
                    <label className="mobile_text">F1</label>
                    <input className="col-md-1 text-center" value="52,04"
                      style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                    <label className="mobile_text">F2</label>
                    <input className="col-md-1 text-center" value="59,92"
                      style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                    <label className="mobile_text">F3</label>
                    <input className="col-md-1 text-center" value="40,20"
                      style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                    <label className="mobile_text">Profilato</label>
                    <div className="col-md-1 text-center" style={{ color: "#333399", fontWeight: "bold" }}>46,46</div>
                    <label className="mobile_text">Peak</label>
                    <input className="col-md-1 col-md-offset-1 text-center" value="52,21"
                      style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                    <label className="mobile_text">OffPeak</label>
                    <input className="col-md-1 text-center" value="43,24"
                      style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                    <label className="mobile_text">Profilato</label>
                    <div className="col-md-1 text-center" style={{ color: "#333399", fontWeight: "bold" }}>46,43</div>
                  </span>
                </div>
                <div className="Variabile row">
                  <p className="col-md-12"
                    style={{ color: "RGB(128, 100, 162)", fontWeight: "bold", marginTop: '10px' }}>Prezzo
                Variabile PUN</p>
                  <span className="col-md-12 row block_mobile">
                    <p className="col-md-1 col-md-offset-1"> </p>
                    <div className="col-md-1 text-center"
                      style={{ background: "RGB(128, 100, 162)", color: "#fff" }}>F1</div>
                    <div className="col-md-1 text-center"
                      style={{ background: "RGB(128, 100, 162)", color: "#fff" }}>F2</div>
                    <div className="col-md-1 text-center"
                      style={{ background: "RGB(128, 100, 162)", color: "#fff" }}>F3</div>
                    <div className="col-md-1 col-md-offset-1 text-center"
                      style={{ background: "RGB(128, 100, 162)", color: "#fff" }}>Orario</div>
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-2  text-center"> </div>
                  </span>
                  <span className="col-md-12 row">
                    <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold" }}>Spread PUN €/MWh</p>
                    <label className="mobile_text">F1</label>
                    <input className="col-md-1 text-center" value="0,50"
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} />
                    <label className="mobile_text">F2</label>
                    <input className="col-md-1 text-center" value="0,50"
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} />
                    <label className="mobile_text">F3</label>
                    <input className="col-md-1 text-center" value="0,50"
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} />
                    <label className="mobile_text">Orario</label>
                    <input className="col-md-1 col-md-offset-1 text-center" value="0,05"
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} />
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-2 text-center"> </div>
                  </span>
                  <span className="col-md-12 row">
                    <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold" }}>margine €/MWh</p>
                    <div className="col-md-1 text-center">{this.state.punMargineF1}</div>
                    <div className="col-md-1 text-center">{this.state.punMargineF2}</div>
                    <div className="col-md-1 text-center">{this.state.punMargineF3}</div>
                    <div className="col-md-1 col-md-offset-1 text-center"> </div>
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-2  text-right"> </div>
                  </span>
                  <span className="col-md-12 row">
                    <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold" }}>Spread PUN Finale €/MWh</p>
                    <label className="mobile_text">F1</label>
                    <input className="col-md-1 text-center" value="0,50"
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} />
                    <label className="mobile_text">F2</label>
                    <input className="col-md-1 text-center" value="0,50"
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} />
                    <label className="mobile_text">F3</label>
                    <input className="col-md-1 text-center" value="0,50"
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} />
                    <label className="mobile_text">Orario</label>
                    <input className="col-md-1 col-md-offset-1 text-center" value="0,05"
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} />
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-2 text-center"> </div>
                  </span>
                </div>
                <div className="col-md-6 Opzione"
                >
                  <p className="col-md-12"
                    style={{ color: "RGB(118, 147, 60)", fontWeight: "bold", marginTop: '10px' }}>Opzione
                Offerta Verde</p>
                  <div className="col-md-6">
                    <span className="col-md-12 row">
                      <div className="col-md-offset-6 col-md-6 text-center"
                        style={{ background: "RGB(155, 187, 89)", color: "#fff" }}>Offerta Verde</div>
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6" style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>Sourcing €/MWh</p>
                      <input className="col-md-6 text-right" value="0,25"
                        style={{ background: "RGB(216, 228, 188)", border: "none" }} />
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6" style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>margine €/MWh</p>
                      <div className="col-md-6 text-right">{this.state.greenMargine}</div>
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6" style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>Prezzo Finale €/MWh</p>
                      <input className="col-md-6 text-right" value="0,25"
                        style={{ background: "RGB(216, 228, 188)", border: "none" }} />
                    </span>
                  </div>
                  <div className="col-md-6">
                    <img src={logo} className="col-md-offset-4" width="130" />
                  </div>
                </div>
                <div className="col-md-6 Opzioni_1"
                >
                  <p className="col-md-12" style={{ color: "#366092", fontWeight: "bold", marginTop: '10px' }}>Opzioni</p>
                  <span className="col-md-6 row">
                    <div className="col-md-10 col-md-offset-2" style={{ marginTop: "20px" }}>
                      <input value="sbilanciamento compreso"
                        onClick={(e) => this.setState({ tipoSbilanciamento: e.target.value })}
                        type="radio" name="Opzioni"
                        checked={this.state.tipoSbilanciamento === "sbilanciamento compreso"}
                      />
                      <label>sbilanciamento compreso</label>
                    </div>
                  </span>
                  <div className="col-md-6">
                    <span className="col-md-12 row" style={quotazioni.isEco !== "S" ? { display: 'none' } : { display: "block" }}>
                      <p className="col-md-6"
                        style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>Fee ECO</p>
                      <input className="col-md-6 text-center" value={this.state.feeEco}
                        onChange={(e) => this.setState({ feeEco: e.target.value })}
                        style={{ background: "RGB(220, 230, 241)", border: "none" }} />
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6" style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>Fee intermediario</p>
                      <input className="col-md-6 text-center" value={this.state.feeIntermediario}
                        onChange={(e) => this.setState({ feeIntermediario: e.target.value })}
                        style={{ background: "RGB(220, 230, 241)", border: "none" }} />
                    </span>
                  </div>
                  <span className="col-md-6 row">
                    <div className="col-md-10 col-md-offset-2" style={{ marginTop: "20px" }}>
                      <input value="sbilanciamento in CTE" type="radio" name="Opzioni"
                        onClick={(e) => this.setState({ tipoSbilanciamento: e.target.value })}
                        checked={this.state.tipoSbilanciamento === "sbilanciamento in CTE"} />
                      <label>sbilanciamento in CTE</label>
                    </div>
                  </span>
                </div>


              </div>
            )}

        </AnimatedView>
      </div>
    );
  }
}

export default NewOffer;
