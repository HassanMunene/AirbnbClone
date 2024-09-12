const HeaderComponent = ({title, subtitle, center}) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="font-bold text-2xl">{title}</div>
            <div className="font-medium text-neutral-500 mt-2">{subtitle}</div>
        </div>
    )
}

export default HeaderComponent;