export const normal = `
  .green {
    color: green; 
  }

  .App::v-deep .orange {
    animation: scaleIn 3s ease-in forwards; 
  }

  @keyframes scaleIn {
    0% {
      transform: scale(0); 
    }
    100% {
      transform: scale(1); 
    } 
  }
`
