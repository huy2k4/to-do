import './test.css'

var name = ['Huy','FE','boss'];
function Hello() {
    return <div>
        {name.map((name, index) => (
            <div className='hi' key={index}>Hello {name}</div>
        ))}
    </div>
}
export default Hello;