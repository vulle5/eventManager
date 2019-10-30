import React, { useState } from 'react';
import { Typography, Button, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { DatePicker } from '@material-ui/pickers';

function FilterBar({
  setDateFilter,
  setLocationFilter,
  locationFilter,
  dateFilter,
  locations
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = value => {
    setAnchorEl(null);
    setLocationFilter(value);
  };

  return (
    <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
      <Typography style={{ marginRight: 16 }}>Valitse sijainti:</Typography>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        variant="outlined"
        style={{ marginRight: 16 }}
        onClick={handleClick}
      >
        {locationFilter.length === 0 ? 'Näytä Kaikki' : locationFilter}
        <ArrowDropDownIcon style={{ marginLeft: '16px' }} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleClose('')}>Näytä kaikki</MenuItem>
        {locations.map((location, i) => (
          <MenuItem key={i} onClick={() => handleClose(location)}>
            {location}
          </MenuItem>
        ))}
      </Menu>
      <Typography style={{ marginRight: 16 }}>Valitse Päivämäärä:</Typography>
      <DatePicker
        label=""
        value={dateFilter}
        onChange={setDateFilter}
        format="DD/MM/YYYY"
      />
    </div>
  );
}

export default FilterBar;
