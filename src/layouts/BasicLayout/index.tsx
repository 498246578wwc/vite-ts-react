import useBasicLayoutStore from '@/store/basicLayout.ts'
import Sidebar from '@/layouts/BasicLayout/components/Sidebar'
import { LAYOUT } from '@/constants/layout'
import MainContent from '@/layouts/BasicLayout/components/MainContent'

const BasicLayout = () => {


 const toggleCollapsed = useBasicLayoutStore(state => state.toggleCollapsed)

  // 监听页面宽度，当宽度缩小时 菜单栏收起
  useEffect(() => {
    let rafId: number;

    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const currentWidth = window.innerWidth;
        const isMobile = currentWidth < LAYOUT.breakpoint;

        // 更新屏幕宽度状态
        useBasicLayoutStore.setState({ screenWidth: currentWidth });

        // 自动行为策略
        const { userToggled, collapsed } = useBasicLayoutStore.getState();

        // 移动端：强制收起（无论用户是否操作过）
        if (isMobile && !collapsed) {
          toggleCollapsed(true);
          useBasicLayoutStore.setState({ userToggled: false }); // 重置操作标识
        }
        // 桌面端：仅当用户未操作时自动展开
        else if (!isMobile && !userToggled && collapsed) {
          toggleCollapsed(false);
        }
      });
    };

    // 立即执行一次初始化检查
    handleResize();

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [])

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* 侧边栏 */}
      <Sidebar/>
      {/* 主内容区 */}
      <MainContent />
    </div>
  )
}

export default memo(BasicLayout)
