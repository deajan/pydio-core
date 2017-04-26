const {Component, PropTypes} = require('react')
const {muiThemeable} = require('material-ui/styles')
const {PydioContextConsumer} = require('pydio').requireLib('boot')

/**
 * Simple alphabet generator to give a first-letter-based pagination
 */
class AlphaPaginator extends Component{

    render(){

        let letters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        letters = [-1, ...letters];
        const {item, paginatorCallback, style, muiTheme, getMessage} = this.props;

        const currentPage = (item.currentParams && item.currentParams.alpha_pages && item.currentParams.value) || -1;

        return (
            <div style={style}>
                {getMessage(249)}:
                {letters.map((l) => {

                    const letterStyle = {
                        display         :'inline-block',
                        cursor          :'pointer',
                        margin          :'0 3px',
                        textDecoration  :(currentPage===l?'underline':'none'),
                        fontSize        : (currentPage===l?'1.3em':'1em')
                    };

                    return (
                        <span
                            key={l}
                            style={letterStyle}
                            onClick={(e) => {paginatorCallback(l)}}>{l === -1 ? getMessage(597) : l}
                            </span>
                    )
                })}
            </div>
        );
    }

}

AlphaPaginator.propTypes = {
    /**
     * Currently selected Item
     */
    item            : PropTypes.object,
    /**
     * When a letter is clicked, function(letter)
     */
    paginatorCallback: PropTypes.func.isRequired,
    /**
     * Main instance of pydio
     */
    pydio           : PropTypes.instanceOf(Pydio),
    /**
     * Display mode, either large (book) or small picker ('selector', 'popover').
     */
    mode            : PropTypes.oneOf(['book', 'selector', 'popover']).isRequired,
}


AlphaPaginator = PydioContextConsumer(AlphaPaginator);
AlphaPaginator = muiThemeable()(AlphaPaginator);

export {AlphaPaginator as default}