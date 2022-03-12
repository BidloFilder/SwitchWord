import './Lists.css'


const Lists = (props) => {
    
  return (
    <div className="list_items">
      {props.listValue.map((value) => {
        return (
          <div key={value.id}>
            <div className="item">
              <p style={{color: '#ffffff'}}>
                {Object.keys(value)[0].charAt(0).toUpperCase() +
                  Object.keys(value)[0].slice(1).toLowerCase()}
              </p>
              <button
                className="delete_btn"
                onClick={props.deleteWord}
                type="button"
              >
                Delete
              </button>
              <p style={{ fontWeight: '400', color: "#ffffff"}}>
                {Object.values(value)[0].charAt(0).toUpperCase() +
                  Object.values(value)[0].slice(1).toLowerCase()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Lists;
