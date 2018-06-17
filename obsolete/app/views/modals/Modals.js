import React from 'react';

import { AnimatedView } from '../../components';

const Modals = () => {
  return(
    <section>
      {/* modals cannot be placed anywhere (avoid backdrop or modal placement issues) */}
      <div id="generalViewModals">
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="modalCtrlNewOffer"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true">
                  ×
                </button>
                <h4 className="modal-title">
                  Modal Tittle
                </h4>
              </div>
              <div className="modal-body">
             Corspo di prova...
              </div>
              <div className="modal-footer">
                <button
                  data-dismiss="modal"
                  className="btn btn-default"
                  type="button">
                  Close
                </button>
                <button
                  className="btn btn-success"
                  type="button">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div
          className="modal fade"
          id="myModalGeneral"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true">
                  ×
                </button>
                <h4 className="modal-title">
                  Modal Tittle
                </h4>
              </div>
              <div className="modal-body">
                Corspo di prova...
              </div>
              <div className="modal-footer">
                <button
                  data-dismiss="modal"
                  className="btn btn-default"
                  type="button">
                  Close
                </button>
                <button
                  className="btn btn-success"
                  type="button">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="myModalGeneral2"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true">
                  ×
                </button>
                <h4 className="modal-title">
                  Modal Tittle
                </h4>
              </div>
              <div className="modal-body">
                Body goes here...
              </div>
              <div className="modal-footer">
                <button
                  data-dismiss="modal"
                  className="btn btn-default"
                  type="button">
                  Close
                </button>
                <button
                  className="btn btn-warning"
                  type="button">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="myModalGeneral3"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true">
                  ×
                </button>
                <h4 className="modal-title">
                  Modal Tittle
                </h4>
              </div>
              <div className="modal-body">
                Body goes here...
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  type="button">
                   Ok
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- modal --> */}
        {/* <!-- Modal --> */}
      </div>
      <div id="basicElementsModals">
        <div
          aria-hidden="true"
          aria-labelledby="myModalLabel"
          role="dialog"
          tabIndex="-1"
          id="myModalBasicElements"
          className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  aria-hidden="true"
                  data-dismiss="modal"
                  className="close"
                  type="button">
                  ×
                </button>
                <h4 className="modal-title">
                  Consumi da Clienti
                </h4>
              </div>
              <div className="modal-body">
                

  <AnimatedView>
            
          <div className="row">
            <div className="col-xs-12">
              <div className="panel">
                <header className="panel-heading">
                  Clienti
                </header>
                <div className="panel-body table-responsive">
                  <div className="box-tools m-b-15">
                    <div className="input-group">
                      <input
                        type="text"
                        name="table_search"
                        className="form-control input-sm pull-right"
                        style={{width: '150px'}}
                        placeholder="Search"
                      />
                      <div className="input-group-btn">
                        <button className="btn btn-sm btn-default">
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Pod</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Panetteria</td>
                        <td>IT0000000</td>
                        <td><span className="label label-success">Carica</span></td>
                      </tr>
                      <tr>
                        <td>Officina</td>
                        <td>IT0000000</td>
                        <td><span className="label label-success">Carica</span></td>
                      </tr>
                      <tr>
                        <td>Enoteca</td>
                        <td>IT0000000</td>
                        <td><span className="label label-success">Carica</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
      </AnimatedView>



              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          aria-labelledby="myModalLabel"
          role="dialog"
          tabIndex="-1"
          id="myModalBasicElements-1"
          className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  aria-hidden="true"
                  data-dismiss="modal"
                  className="close"
                  type="button">
                  ×
                </button>
                <h4 className="modal-title">
                  Form Tittle
                </h4>
              </div>
              <div className="modal-body">
                <form
                  className="form-horizontal"
                  role="form">
                  <div className="form-group">
                    <label
                      htmlFor="inputEmail1"
                      className="col-lg-2 col-sm-2 control-label">
                      Email
                    </label>
                    <div className="col-lg-10">
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="inputPassword1"
                      className="col-lg-2 col-sm-2 control-label">
                      Password
                    </label>
                    <div className="col-lg-10">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-lg-offset-2 col-lg-10">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" />
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-lg-offset-2 col-lg-10">
                      <button
                        type="submit"
                        className="btn btn-default">
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          aria-labelledby="myModalLabel"
          role="dialog"
          tabIndex="-1"
          id="myModalBasicElements-2"
          className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  aria-hidden="true"
                  data-dismiss="modal"
                  className="close"
                  type="button">
                  ×
                </button>
                <h4 className="modal-title">
                  Verifica Offerte
                </h4>
              </div>
              <div className="modal-body">
                

<section className="panel">
                                  <header className="panel-heading">
                                      Problemi riscontrati
                                  </header>
                                      <div className="panel-body" id="noti-box">

                                          <div className="alert alert-block alert-danger">
                                              <button data-dismiss="alert" className="close close-sm" type="button">
                                                  <i className="fa fa-times"></i>
                                              </button>
                                              <strong>Data Scadenza</strong> Valorizzare la data scadenza
                                          </div>
                                          <div className="alert alert-warning">
                                              <button data-dismiss="alert" className="close close-sm" type="button">
                                                  <i className="fa fa-times"></i>
                                              </button>
                                              <strong>Data Fornitura</strong> Data fine fornitura inferiore a inizio
                                          </div>
                                          <div className="alert alert-info">
                                              <button data-dismiss="alert" className="close close-sm" type="button">
                                                  <i className="fa fa-times"></i>
                                              </button>
                                              <strong>Data Fornitura</strong> Margine inferiore: necessita conferma responsabile
                                          </div>

                                      </div>
                              </section>


              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Modals;
