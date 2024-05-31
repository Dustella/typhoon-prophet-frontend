const Source = () => {
  return (
    <div class=" py-[5rem] bg-slate-800">
      <div class="bg-slate-600 text-white rounded-3xl h-full max-w-[980px] mx-auto py-30 flex flex-col items-center shadow-2xl p-10">
        <h1 class="text-4xl p-4 font-bold">数据来源</h1>
        <p class="p-4">
          2013 年，世界气象组织世界天气研究计划 ( WMO / WWRP)
          联合世界气候研究计划（WCRP）启动了其三大核心计划之一的季节内到季节预测计划（S2S计划）。S2S
          计划自 2013 年启动至今， 已进入了第二个执行期（2018 年 11 月—2023 年
          12 月）。
        </p>
        <p class="p-4">/typhoon-backend
          本文的<strong>预报数据</strong>
          使用世界气象组织S2S预测计划中比较有效的几种模式。多个模式对于同一天的预报的集合我们称为多模式预报，多模式预报是本文模型的主要输入。S2S计划第二阶段从2015年开始，其中各预报机构不仅发布实时的预报，也发布对过去20年的重报。
        </p>
        <table class="table ">
          <thead>
            <tr class="font-bold text-white">
              <th>中文名称</th>
              <th>英文全称</th>
              <th>简称</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>澳大利亚气象局</td>
              <td>Australian Bureau of Meteorology</td>
              <td>BoM</td>
            </tr>
            <tr>
              <td>中国气象局</td>
              <td>China Meteorological Administration</td>
              <td>CMA</td>
            </tr>
            <tr>
              <td>欧洲中期天气预报中心</td>
              <td>European Centre for Medium-Range Weather Forecasts</td>
              <td>ECMWF</td>
            </tr>
            <tr>
              <td>加拿大环境与气候变化部</td>
              <td>Environment and Climate Change Canada</td>
              <td>ECCC</td>
            </tr>
            <tr>
              <td>法国国家大气科学与气候研究所</td>
              <td>
                Institute of Atmospheric Sciences and Climate of the National
                Research Council
              </td>
              <td>CNR-ISAC</td>
            </tr>
            <tr>
              <td>俄罗斯水文气象中心</td>
              <td>Hydrometeorological Centre of Russia</td>
              <td>HMCR</td>
            </tr>
            <tr>
              <td>日本气象厅</td>
              <td>Japan Meteorological Agency</td>
              <td>JMA</td>
            </tr>
            <tr>
              <td>韩国气象局</td>
              <td>Korea Meteorological Administration</td>
              <td>KMA</td>
            </tr>
            <tr>
              <td>法国国家气象研究中心</td>
              <td>Centre National de Recherche Meteorologiques</td>
              <td>CNRM</td>
            </tr>
            <tr>
              <td>美国国家环境预报中心</td>
              <td>National Centers for Environmental Prediction</td>
              <td>NCEP</td>
            </tr>
            <tr>
              <td>英国气象局</td>
              <td>Met office, UKMO</td>
              <td>UKMO</td>
            </tr>
          </tbody>
        </table>
        <p class="p-4">
          这些模式的预报时效和预报频次不同，下表列出了这些模式的一些基本信息。这些模式的预报时效从0到60天不等，预报频次从每天到每周不等，集合成员数量从4到51不等。这些模式的开始运行日期也不同，从2015年到2017年不等。
        </p>
        <table class="table">
          <thead>
            <tr class="font-bold text-white">
              <th>模式简称</th>
              <th>预报时效（天）</th>
              <th>预报频次</th>
              <th>集合成员数量</th>
              <th>开始运行日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CMA</td>
              <td>0–60</td>
              <td>每天</td>
              <td>4</td>
              <td>2016</td>
            </tr>
            <tr>
              <td>ECCC</td>
              <td>0–32</td>
              <td>每周</td>
              <td>21</td>
              <td>2017</td>
            </tr>
            <tr>
              <td>ECMWF</td>
              <td>0–46</td>
              <td>每周两次</td>
              <td>51</td>
              <td>2015</td>
            </tr>
            <tr>
              <td>HMCR</td>
              <td>0–61</td>
              <td>每周</td>
              <td>22 & 41</td>
              <td>2015</td>
            </tr>
            <tr>
              <td>ISAC</td>
              <td>0–31</td>
              <td>每5天</td>
              <td>41</td>
              <td>2017</td>
            </tr>
            <tr>
              <td>JMA</td>
              <td>0–33</td>
              <td>每个月三次</td>
              <td>50 & 5</td>
              <td>2016</td>
            </tr>
            <tr>
              <td>KMA</td>
              <td>0–60</td>
              <td>每个月四次</td>
              <td>4</td>
              <td>2015</td>
            </tr>
            <tr>
              <td>NCEP</td>
              <td>0–44</td>
              <td>每天</td>
              <td>16</td>
              <td>2016</td>
            </tr>
            <tr>
              <td>UKMO</td>
              <td>0–60</td>
              <td>每个月四次</td>
              <td>4</td>
              <td>2017</td>
            </tr>
          </tbody>
        </table>
        <p class="p-4">
          本文采用的观测数据，1999-2010年的部分来自
          <a href="http://www.metoc.navy.mil/jtwc" class="link">
            Joint Typhoon Warning Center
          </a>
          ，2015-2023年的数据来自
          <a href="https://www.ncdc.noaa.gov/ibtracs/" class="link">
            IBTrACS
          </a>
          ，他们都发布每天台风的路径和位置。由于我国主要受西北太平洋区域的台风影响，本文主要研究西北太平洋，100°E
          ~ 180°，0°~
          30°N的所有非陆地区域出现TC的概率。由于每年在西北太平洋，台风主要都在夏季出现，因此每年只截取5月1日到10月31日的数据。我们总共的数据集规模非常小。从2017到2023的5.1到11.1之间，西北太平洋海域总共只产生了134个台风。
        </p>
      </div>
    </div>
  );
};

export default Source;
