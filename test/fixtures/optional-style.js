import styled from './App.styled'
const bool = false
const bool2 = false
const green = 'green'
function Test() {
  return (
    <div>
      {bool && bool2 && <style jsx>{'.a {color: red;}'}</style>}
      {bool && (
        <style jsx>{`
          .a {
            color: ${green};
          }
        `}</style>
      )}
      {bool && <style jsx>{styled}</style>}
    </div>
  )
}
