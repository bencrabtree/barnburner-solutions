import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './search-bar.scss';
import Autocomplete, { createFilterOptions }  from '@material-ui/lab/Autocomplete';
import BBSIcon from '../common/BBSIcon/BBSIcon';
import { useAppState } from '../../store';
import { isLoggedIn } from '../../util/auth';
import { TextField } from '@material-ui/core';

const SearchBar = ({ placeholder, onSubmit, onAddNewLead }) => {
    const { fullRoster } = useAppState();
    const [ value, setValue ] = useState();
    const filter = createFilterOptions();

    /**
     * Triggers when user types in field
     */
    const handleInputChange = (e, val) => {
        if (typeof val === 'string') {
            setValue({
                full_name: val,
            });
        } else if (val && val.inputValue) {
            setValue({
                full_name: val.inputValue,
            });
        } else {
            setValue(val);
        }
    }

    /**
     * Triggers on tag-complete or selection from dropdown
     */
    const handleChange = (e, val) => {
        if (typeof val === 'string') {
            if (fullRoster.find(x => x.full_name.toLowerCase() === val.toLowerCase())) {
                onSubmit(val);
                return;
            } else if (isLoggedIn()) {
                onAddNewLead(val);            
            }
        } else if (val && val.inputValue && isLoggedIn()) {
            onAddNewLead(val.inputValue);
        } else if (fullRoster.find(x => x.full_name.toLowerCase() === val?.full_name?.toLowerCase())) {
            onSubmit(val);
            return;
        }
    }

    /**
     * 
     */
    const getOptionLabel = (option) => {
        if (typeof option === 'string') {
            return option;
        }
        if (option.inputValue) {
            return option.inputValue;
        }
        return option.full_name;
    }

    /**
     * 
     */
    const generateFilterOptions = (options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '' && isLoggedIn()) {
          filtered.push({
            inputValue: params.inputValue,
            full_name: `Create New Lead: "${params.inputValue}"`,
          });
        }

        return filtered;
    }

    return (
        <div className='search-bar'>
            <BBSIcon type='search-icon' />
            <Autocomplete
                freeSolo
                value={value}
                id="main-search-bar"
                options={fullRoster}
                renderInput={ params => <TextField { ...params } placeholder={ placeholder } InputProps={{ ...params.InputProps, disableUnderline: true }}/> }
                renderOption={ option => option.full_name }
                getOptionLabel={getOptionLabel}
                onChange={handleChange}
                onInputChange={handleInputChange}
                filterOptions={generateFilterOptions}
            />
        </div>
    )
}

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
}

SearchBar.defaultProps = {
    placeholder: "Search for an artist"
}

export default SearchBar;