import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
  <main>
  <PageHero title="about"/>
  {/* Adding the CSS Global Classes */}
  <Wrapper className="page section section-center">
      <img src={aboutImg} alt="Nice Desk"/>
      <article>
        <div className='title'>
          <h2>Our Story</h2>
          <div className="underline"></div>
        </div>
        <p>
          ende udneuce undue deunde n deunde
          ueuduedued eundued eudneuede eudeud
          nduendue heudneun eudnuendn endned
          uduede hduheude euhdue eudeud eudue
          euduhed heude heude edneudne eudne
          euduned beudnued uednue eudeud eudeu
          sxmsix nsuxns nsuxns suxns hsxusnx 
          sixjisjjx sjuxjs xsuxns sxunsx sxunsx
          yhkyoj jidej rkfrkr yhmoymh xdcnfgok
        </p>
      </article>
  </Wrapper>
  </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
