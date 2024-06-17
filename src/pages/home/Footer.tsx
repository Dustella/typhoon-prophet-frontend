import DatabaseLogo from "../../assets/database.svg";
import GithubLogo from "../../assets/github.svg";
import TyphoonLogo from "../../assets/typhoon.svg";

export const Footer = () => {
  return (
    <>
      <footer class="footer footer-center p-5 bg-slate-700 rounded shadow text-white">
        <nav class="grid grid-flow-row md:grid-flow-col gap-4">
          <h6 class="font-bold uppercase opacity-60">友情链接</h6>
          <a
            rel="noopener"
            class="link link-hover"
            href="https://www.nuist.edu.cn/"
            target="_blank"
          >
            南京信息工程大学
          </a>
          <a
            rel="noopener"
            class="link link-hover"
            href="http://data.cma.cn"
            target="_blank"
          >
            中国气象数据服务中心
          </a>
          <a
            rel="noopener"
            class="link link-hover"
            href="https://wmo.int/"
            target="_blank"
          >
            世界气象组织
          </a>
          <a
            rel="noopener"
            class="link link-hover"
            href="http://www.s2sprediction.net/"
            target="_blank"
          >
            S2S Project
          </a>
        </nav>
        <nav class="grid grid-flow-col gap-4">
          <img
            src={DatabaseLogo}
            class="w-6 h-6 fill-current"
            alt="database-logo"
          />
          <img
            src={TyphoonLogo}
            class="w-6 h-6 fill-current"
            alt="typhoon-logo"
          />
          <img
            src={GithubLogo}
            class="w-6 h-6 fill-current"
            alt="github-logo"
            onClick={() => window.open("https://github.com/Dustella/typhoon-prophet-frontend")}
          />
        </nav>
        <nav class="grid grid-flow-col gap-4">
          <p>Copyright © 2024 - All right reserved</p>
        </nav>
      </footer>
    </>
  );
};
