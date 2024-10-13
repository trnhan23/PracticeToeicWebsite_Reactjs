import React from "react";
import * as XLSX from "xlsx";

export default class UploadFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            cols: [],
        };
    }

    handleFile = (file) => {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];

            // Convert sheet data to JSON
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            this.setState({ data: data, cols: make_cols(ws["!ref"]) });
        };

        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    };

    exportFile = () => {
        const ws = XLSX.utils.aoa_to_sheet(this.state.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

        XLSX.writeFile(wb, "sheetjs.xlsx");
    };

    render() {
        return (
            <DragDropFile handleFile={this.handleFile}>
                <div className="row">
                    <div className="col-xs-12">
                        <DataInput handleFile={this.handleFile} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <button
                            disabled={!this.state.data.length}
                            className="btn btn-success"
                            onClick={this.exportFile}
                        >
                            Export
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <OutTable data={this.state.data} cols={this.state.cols} />
                    </div>
                </div>
            </DragDropFile>
        );
    }
}

/* Drag and Drop File Component */
class DragDropFile extends React.Component {
    suppress = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
    };

    onDrop = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        const files = evt.dataTransfer.files;
        if (files && files[0]) {
            this.props.handleFile(files[0]);
        }
    };

    render() {
        return (
            <div
                onDrop={this.onDrop}
                onDragEnter={this.suppress}
                onDragOver={this.suppress}
            >
                {this.props.children}
            </div>
        );
    }
}

/* File Input Component */
class DataInput extends React.Component {
    handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            this.props.handleFile(files[0]);
        }
    };

    render() {
        return (
            <form className="form-inline">
                <div className="form-group">
                    <label htmlFor="file">Spreadsheet</label>
                    <input
                        type="file"
                        className="form-control"
                        id="file"
                        accept={SheetJSFT}
                        onChange={this.handleChange}
                    />
                </div>
            </form>
        );
    }
}

/* Table Output Component */
class OutTable extends React.Component {
    render() {
        const { data, cols } = this.props;
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    {/* Không hiển thị phần tiêu đề */}
                    {/* <thead>
                        <tr>
                            {cols.map((c) => (
                                <th key={c.key}>{c.name}</th>
                            ))}
                        </tr>
                    </thead> */}
                    <tbody>
                        {data.map((r, i) => (
                            <tr key={i}>
                                {cols.map((c) => (
                                    <td key={c.key}>{r[c.key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}


/* Supported File Types */
const SheetJSFT = [
    "xlsx",
    "xls",
]
    .map((x) => `.${x}`)
    .join(",");

/* Generate Column Headers */
const make_cols = (refstr) => {
    let o = [],
        C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (let i = 0; i < C; ++i) {
        o[i] = { name: XLSX.utils.encode_col(i), key: i };
    }
    return o;
};
