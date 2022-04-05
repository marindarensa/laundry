import React from "react"
import axios from "axios"
import { baseUrl, formatNumber, authorization } from "../config.js";
import domToPdf from "dom-to-pdf";
import logo from "../components/asset/logo.png"

export default class Print extends React.Component {
    constructor() {
        super()
        this.state = {
            transaksi: [],
            paket: [],
            visible: "",
            user: "",
            resi: "",
            customer: "",
            resi: "",
            petugas: "",
            tgl: "",
            paket: "",
            dibayar: "",
            total: ""

        }

        if (!localStorage.getItem("token")) {
            window.location.href = "/auth"
        }
    }

    convertPdf() {
        // ambil element yang akan diconvert ke pdf
        let element = document.getElementById(`target`)
        let options = {
            filename: "resi.pdf"
        }

        domToPdf(element, options, () => {
            window.alert("file will download soon")
        })
    }

    getTransaksiPrint(ev) {
        ev.preventDefault()
        let endpoint = `${baseUrl}/transaksi/print`
        let newData = {
            resi: this.state.resi
        }
        axios
            .post(endpoint, newData, authorization)
            .then(response => {
                this.setState({
                    visible: true,
                    outlet: response.data.user.outlet.nama_outlet,
                    resi: response.data.resi,
                    customer: response.data.member.nama,
                    petugas: response.data.user.nama,
                    tgl: response.data.tgl,
                    paket: "",
                    dibayar: response.data.dibayar,
                })

                let dataTransaksi = response.data
                for (let i = 0; i < dataTransaksi.length; i++) {
                    let total = 0;
                    for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                        let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                        let qty = dataTransaksi[i].detail_transaksi[j].qty

                        total += (harga * qty)

                        // tambahkan key total
                        dataTransaksi[i].total = total
                    }
                }
            })
            .catch(error => console.log(error))

    }

    convertTime = tgl => {
        let date = new Date(tgl)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    convertStatusBayar(dibayar) {
        if (dibayar === 0) {
            return (
                <div>
                    Belum Dibayar
                </div>
            )
        } else if (dibayar === 1) {
            return (
                <div>
                    Sudah Dibayar
                </div>
            )
        }
    }

    render() {
        const target = React.createRef()
        const optionPDF = {
            orientation: `potrait`,
            unit: `cm`,
            format: [12, 8]
        }
        return (
            <div className="container">

                <form onSubmit={(ev) => this.getTransaksiPrint(ev)} className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
                        <label for="resi" className="sr-only">Resi</label>
                        <input className="form-control" id="resi" placeholder="nomer resi"
                            onChange={ev => this.setState({ resi: ev.target.value })} />
                    </div>
                    <button className="btn btn-primary mb-2"
                        type="submit">
                        input
                    </button>
                    <button className={`btn btn-success mb-2 ${this.state.visible ? `` : `d-none`}`}
                        onClick={() => this.convertPdf()}>
                        Print Resi
                    </button>
                </form>


                <div className={`print ${this.state.visible ? `` : `d-none`}`}>
                    <div ref={target} id="target">
                        <center><img src={logo} className="img-print" /></center><br />
                        <p><b>Info Pesanan</b></p><hr />
                        <body>
                            <div class="card" style="width: 30rem;">
                                <div class="card-body">
                                    <h5 class="card-title">Info Pesanan</h5>
                                        <p class="card-text">Resi         : {this.state.resi}</p>
                                        <p class="card-text">Outlet       : {this.state.outlet}</p>
                                        <p class="card-text">Nama Customer: {this.state.customer}</p>
                                        <p class="card-text">Nama Petugas : {this.state.petugas}</p>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Rincian Pesanan</h5>
                                        <p class="card-text">Tanggal Pemesanan : {this.convertTime(this.state.tgl)}</p>
                                        <p class="card-text">Paket yang dipesan : {this.state.paket}</p>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Info Pesanan</h5>
                                        <p class="card-text">Status Pembayaran: {this.convertStatusBayar(this.state.dibayar)}</p>
                                        <p class="card-text">Total Harga: Rp {formatNumber(this.state.total)}</p>
                                </div>
                            </div>
                        </body>
                    </div>
                </div>
            </div>
        )
    }
}
