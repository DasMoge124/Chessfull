
export default Learn;
// defines the learn page. This will be exported to App.jsx and rendered when the user navigates to /learn
function Learn() { // learn component
return(
    <> 
    <div class = "ButtonElements">
        <button>Beginner</button>
        </div>
    <div class = "ButtonElements">
        <button>Intermediate</button>
        </div>
    <div class = "ButtonElements">
        <button>Advanced</button>
        </div>
    </>
)
}