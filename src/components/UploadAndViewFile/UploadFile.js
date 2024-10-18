import React from "react";
import * as XLSX from "xlsx";
import { importFileQuestionAndAnswer, importFileExam } from '../../services/questionAndAnswerService';


export default class UploadFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            cols: [],
            message: '',
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

    validatePart1And2 = (data) => {
        return data.slice(1).reduce((acc, row) => {
            const numberQu = row[0];
            const type = row[1];
            const audioFile = row[2] || null;
            const images = row[3] || null;
            const text = row[4] || null;
            const questionText = row[5];
            const answerA = row[6];
            const answerB = row[7];
            const answerC = row[8];
            const answerD = row[9];
            const correctAnswer = row[10];

            if (type === 'Part 1' || type === 'Part 2') {
                acc.push({
                    audioFile: audioFile,
                    images: images,
                    text: text,
                    questionType: type,
                    examId: 'examId_placeholder',
                    questions: [{
                        numberQuestion: numberQu,
                        questionText: questionText,
                        answerA: answerA,
                        answerB: answerB,
                        answerC: answerC,
                        answerD: answerD,
                        correctAnswer: correctAnswer
                    }]
                });
            }
            return acc;
        }, []);
    }

    validatePart3And4 = (data) => {
        return data.slice(1).reduce((acc, row) => {
            const numberQu = row[0];
            const type = row[1];
            const audioFile = row[2];
            const images = row[3] || null;
            const text = row[4] || null;
            const questionText = row[5];
            const answerA = row[6];
            const answerB = row[7];
            const answerC = row[8];
            const answerD = row[9];
            const correctAnswer = row[10];

            if (type === 'Part 3' || type === 'Part 4') {
                if (audioFile) {
                    const newEntry = {
                        audioFile: audioFile,
                        images: images,
                        text: text,
                        questionType: type,
                        examId: 'examId_placeholder',
                        questions: [{
                            numberQuestion: numberQu,
                            questionText: questionText,
                            answerA: answerA,
                            answerB: answerB,
                            answerC: answerC,
                            answerD: answerD,
                            correctAnswer: correctAnswer
                        }]
                    };
                    acc.push(newEntry);
                } else {
                    if (acc.length > 0) {
                        const lastEntry = acc[acc.length - 1];
                        lastEntry.questions.push({
                            numberQuestion: numberQu,
                            questionText: questionText,
                            answerA: answerA,
                            answerB: answerB,
                            answerC: answerC,
                            answerD: answerD,
                            correctAnswer: correctAnswer
                        });
                    }
                }
            }

            return acc;
        }, []);
    };

    formatData = (data) => {
        const part1And2Data = this.validatePart1And2(data);
        const part3And4Data = this.validatePart3And4(data);

        return [...part1And2Data, ...part3And4Data];
    };


    handleUploadToDatabase = async () => {
        try {
            const formattedData = this.formatData(this.state.data);

            console.log("Formatted Data:", formattedData);

            // Send the formatted data to the backend API
            const response = await importFileExam(formattedData);

            if (response && response.errCode === 0) {
                this.setState({ message: 'Upload successful!' });
            } else {
                this.setState({ message: 'Error: ' + (response.errMessage || 'Unknown error') });
            }
        } catch (error) {
            console.error('Error uploading data:', error);
            this.setState({ message: 'An error occurred while uploading.' });
        }
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
                        <button
                            disabled={!this.state.data.length}
                            className="btn btn-primary"
                            onClick={this.handleUploadToDatabase}
                        >
                            Upload to Database
                        </button>
                        {this.state.message && <p>{this.state.message}</p>}
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