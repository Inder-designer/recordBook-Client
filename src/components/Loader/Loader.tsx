import "./Loader.css";
type LoaderProps = {
    type?: 'bar' | 'spinner';
    classes?: string;
};

const Loader = ({
    type,
    classes = '',
}: LoaderProps) => {

    switch (type) {
        case "spinner":
            return (
                <div
                    className={`custom-loader ${type} ${classes}`}
                    style={{ width: '40px', height: '40px' }}
                />
            )
        case "bar":
            return (
                <div
                    className={`custom-loader ${type} ${classes}`}
                    style={{ width: `26px`, height: `14px` }}
                />
            )
    }

    return (
        <div className={`flex items-center justify-center h-screen ${classes}`}>
            <div className="loader"></div>
        </div>
    )
}

export default Loader
