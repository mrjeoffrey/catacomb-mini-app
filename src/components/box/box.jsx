const Box = ({imageSrc, title, children}) => {
    return (
        <div className="box">
            <div className="box__head">
                <img src={imageSrc} width="25" height="25" alt="" />

                <h4 className="box__title">{title}</h4>
            </div>

            <div className="box__body">
               {children}
            </div>
        </div>
    );
};

export default Box;