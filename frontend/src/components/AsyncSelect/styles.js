export default {
  menu: styles => ({
    ...styles,
    marginTop: '-15px',
  }),

  menuList: () => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),

  control: styles => ({
    ...styles,
    width: '100%',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'default',
    padding: '0 0 0 25px',
  }),

  singleValue: styles => ({
    ...styles,
    color: '#222',
  }),

  dropdownIndicator: styles => ({
    ...styles,
  }),

  option: (styles, { isFocused }) => ({
    ...styles,
    borderLeft: isFocused ? `5px solid #7d40e7` : `5px solid transparent`,
    backgroundColor: isFocused && `#f5f5f5`,
    color: '#222',
    display: 'flex',
    listStyle: 'none',
    padding: '10px',
    cursor: 'pointer',
    width: '100%',
  }),
};
