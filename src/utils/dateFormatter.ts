// src/utils/dateFormatter.ts
/**
 * 格式化日期为易读格式
 * @param dateString ISO格式的日期字符串
 * @returns 格式化后的日期字符串
 */
export const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      
      // 检查日期是否有效
      if (isNaN(date.getTime())) {
        return '未知日期';
      }
      
      // 获取今天和昨天的日期
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // 今天或昨天的特殊格式
      if (isSameDay(date, today)) {
        return `今天 ${formatTime(date)}`;
      } else if (isSameDay(date, yesterday)) {
        return `昨天 ${formatTime(date)}`;
      }
      
      // 标准格式
      return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${formatTime(date)}`;
    } catch (error) {
      console.error('Date formatting error:', error);
      return '无效日期';
    }
  };
  
  /**
   * 检查两个日期是否为同一天
   */
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  /**
   * 格式化时间部分
   */
  const formatTime = (date: Date): string => {
    return `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
  };
  
  /**
   * 数字补零
   */
  const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };