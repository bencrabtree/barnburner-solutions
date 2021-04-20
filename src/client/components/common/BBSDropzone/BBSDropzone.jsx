import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './bbs-dropzone.scss';
import { useDropzone } from 'react-dropzone';
import { clone, deepClone } from 'lodash';

const BBSDropzone = ({
    id,
    label,
    message,
    maxFileCount,
    onChange,
    onError
}) => {
    const [ acceptedFiles, setAcceptedFiles ] = useState([]);

    const onDrop = async (uploadedFiles) => {
        let tempFiles = clone(acceptedFiles)
        let fsPromise = new Promise((resolve, reject) => {
            uploadedFiles.forEach(async (file, idx, arr) => {
                tempFiles.push(file);
                if (idx === arr.length - 1) resolve();
            });
        });
        fsPromise.then(() => {
            onChange(id, tempFiles);
            setAcceptedFiles(tempFiles);
            console.log(tempFiles)
        });
    };

    const onDropRejected = async () => {
        onError("Maximum file upload size is 5mb")
    }

    const generateAcceptedFiles = () => {
        return acceptedFiles.map((file, key) => {
            return (
                <div className='uploaded-files' key={key}>
                    <span onClick={() => removeFile(file)}>X</span>
                    <p>
                        { file.name }
                    </p>
                </div>
            )
        })
    }

    const removeFile = fileName => {
        let tempFiles = clone(acceptedFiles);
        const idx = tempFiles.findIndex(x => x === fileName);
        if (idx > -1) {
            tempFiles.splice(idx, 1);
        }
        onChange(id, tempFiles);
        setAcceptedFiles(tempFiles);
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: maxFileCount, maxSize: 2097152 * 2.5, onDropRejected });

    return (
        <div className='bbs-dropzone'>
            <label>
                { label }
            </label>
            <div className="dropzone-area" {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>{ message }</p>
                }
            </div>
            <div className='dropzone-accepted-files'>
                { generateAcceptedFiles() }
            </div>
        </div>
    )
}

BBSDropzone.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    message: PropTypes.string,
    maxFileCount: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

BBSDropzone.defaultProps = {
    message: "Drag n Drop your files here or click to upload",
    maxFileCount: Number.POSITIVE_INFINITY,
}

export default BBSDropzone;