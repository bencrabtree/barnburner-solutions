import React, { useState, useEffect } from 'react';
import './bbs-pills.scss';
import { Autocomplete } from '@material-ui/lab';
import { TextField, Chip } from '@material-ui/core';

const BBSPills = ({
    id,
    onChange,
    disabled,
    defaultValue,
    options,
    placeholder,
    label
}) => {

    const handleChange = (e, value) => {
        onChange(id, value)
    }

    return (
        <div className='bbs-pills'>
            { label && <label>
                { placeholder }
            </label> }
            <Autocomplete
                multiple freeSolo
                id={id}
                disabled={disabled}
                options={options.filter(x => !defaultValue.find(elt => elt === x))}
                onChange={handleChange}
                defaultValue={defaultValue}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField {...params} variant="filled" placeholder={placeholder} />
                )}
            />
        </div>
    )
}

export default BBSPills;