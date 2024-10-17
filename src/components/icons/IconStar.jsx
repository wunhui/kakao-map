export const IconStar = ({isActive, fill}) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 18 18"
            >
                {
                    isActive ?
                    <path fill={fill ? fill : '#000'} fillRule="evenodd" stroke={fill ? fill : '#000'} strokeWidth="1.08" d="M8.138 1.757c.265-.805 1.426-.808 1.695-.004l1.54 4.598 4.94-.012c.863-.003 1.225 1.079.528 1.578l-3.99 2.854 1.54 4.599c.268.804-.67 1.475-1.37.98l-4.004-2.835-3.99 2.855c-.697.499-1.639-.168-1.374-.973l1.515-4.606-4.005-2.834c-.7-.495-.344-1.579.52-1.581l4.94-.012 1.515-4.607Z" clipRule="evenodd"></path>
                    :
                    <path d="M8.736 1.953c.036-.109.125-.171.25-.172l-.25.172Zm0 0-1.657 5.04-5.395.013c-.137 0-.217.074-.25.172a.237.237 0 0 0-.004.141.23.23 0 0 0 .097.123l4.384 3.103-1.66 5.049a.213.213 0 0 0-.002.147c.015.04.046.083.094.117a.26.26 0 0 0 .318 0l4.353-3.116 4.37 3.093a.26.26 0 0 0 .318 0 .257.257 0 0 0 .094-.119.213.213 0 0 0-.003-.146l-1.687-5.04 4.368-3.126a.232.232 0 0 0 .095-.123.238.238 0 0 0-.005-.142c-.033-.098-.113-.171-.25-.17l-5.395.013-1.684-5.03c-.036-.109-.125-.17-.25-.17M7.54 1.56C7.993.18 9.969.174 10.43 1.553l1.395 4.167 4.485-.012c1.447-.004 2.117 1.848.897 2.721l-3.61 2.584 1.39 4.157c.478 1.427-1.173 2.513-2.33 1.693l-3.639-2.575-3.624 2.594c-1.153.824-2.81-.252-2.34-1.682l1.37-4.164L.798 8.471C-.427 7.604.234 5.75 1.68 5.746l4.485-.012L7.54 1.56Z">
                    </path>
                }
        </svg>
    )
}