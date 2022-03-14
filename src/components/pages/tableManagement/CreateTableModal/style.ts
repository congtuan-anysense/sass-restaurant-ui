import styled from "styled-components";

export const Wrapper = styled.div`
  .modal {
    position: absolute;
    z-index: 20;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 471px;
    background: #ffffff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);
    border-radius: 8px;
    padding: 30px;
    .text-input {
      input {
        width: 134px;
        min-width: 134px;
      }
    }
    .modal-label {
      width: 25%;
    }
    .w-75-pc {
      width: 75%;
    }
    .input-w-full {
      .option {
        width: 310px;
      }
    }
  }
  .backdrop {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: #000000;
    top: 0;
    left: 0;
    opacity: 0.3;
  }
`;
