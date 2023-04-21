import styled from "styled-components";

export const CardWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .titles {
    font-family: var(--font-inter);
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 1em;
    letter-spacing: 0em;
    transition: opacity 0.4s ease-out;
    opacity: 1; /* Set the initial opacity to 1 */
  }
  .wrapper {
    display: flex;
    width: 100%;
    justify-content: space-around;
    flex-wrap: "wrap";

    .card {
      width: 36em;
      height: 17em;
      border-radius: 25px;
      cursor: pointer;
      padding: 1.5rem;
      position: relative;
      display: flex;
      align-items: flex-end;
      transition: 0.4s ease-out;

      .MyButton svg {
        animation: bounce 0.5s ease infinite alternate;
      }

      @keyframes bounce {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(-5px);
        }
      }

      &:hover {
        transform: scale(1.05);
        img {
          filter: brightness(70%);
        }

        &:before {
          opacity: 1;
        }

        .info {
          opacity: 1;
          transform: translateY(60px);
        }
      }

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 15px;
        background: rgba(black, 0.6);
        z-index: 2;
        transition: 0.5s;
        opacity: 0;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contained;
        position: absolute;
        top: 0;
        left: 0;
        filter: brightness(40%);
        border-radius: 15px;
        transition: filter 0.4s ease-out;
      }

      .info {
        position: relative;
        font-family: var(--font-inder);
        font-size: 32px;
        font-weight: 900;
        line-height: 49px;
        letter-spacing: 0em;
        text-align: left;
        color: "transparent";
        opacity: 0;
        transform: translateY(30px);
        transition: 0.5s;
        z-index: 10;
      }
    }
  }
`;
